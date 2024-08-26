import type { Photo } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import * as v from "valibot";
import sharp from "sharp";
import db from "$lib/prisma";

const photoSchema = v.object({
	caption: v.pipe(v.string(), v.minLength(2, "caption is too short")),
	blob: v.pipe(
		v.file("please select an image"),
		v.mimeType(
			["image/jpg", "image/png", "image/webp", "image/jpeg"],
			"please choose a valid image",
		),
		v.minSize(1, "file is too small or invalid"),
	),
	university: v.string(),
	classYear: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(4, "year must be 4 numbers"),
		v.maxLength(4, "year must be 4 numbers"),
		v.transform(Number),
	),
	userId: v.string(),
});

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, "/photos");
	}

	return { user: locals.user };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = Object.fromEntries(
			await request.formData(),
		) as unknown as Photo;

		const { output, issues, success } = v.safeParse(
			photoSchema,
			{ ...form, userId: locals.user.id },
			{ abortEarly: true },
		);
		if (!success) {
			const errors = issues.map((issue) => issue.message);
			return fail(400, { message: errors[0] });
		}

		// convert image to string so it can be stored inside the database
		// NOTE: render does not support storing files on disk, afaik
		try {
			const base64urlImage = (
				await sharp(await output.blob.arrayBuffer())
					.resize({
						width: 300,
						height: 250,
					})
					.webp()
					.toBuffer()
			).toString("base64");

			// reassign image string to the blob
			output.blob = base64urlImage as unknown as File;
		} catch (error) {
			console.log(error);
			return fail(400, {
				message: "error converting your image, use another image",
			});
		}

		try {
			await db.photos.create({
				data: {
					blob: String(output.blob),
					caption: output.caption,
					classYear: String(output.classYear),
					university: output.university,
					userId: output.userId,
				},
			});
		} catch (error: any) {
			console.log(error);
			return fail(400, { message: error.message });
		}

		redirect(307, "/photos");
	},
};
