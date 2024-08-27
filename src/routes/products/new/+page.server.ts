import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import sharp from "sharp";
import db from "$lib/prisma";

const productSchema = z.object({
	title: z.string().trim().min(2, { message: "title is too short" }),
	price: z
		.number({ coerce: true })
		.min(1, { message: "price must be 1 or greater" }),
	description: z
		.string()
		.trim()
		.min(5, { message: "description is too short" }),
	rating: z.number({ coerce: true }).default(1),
	image: z.any(z.instanceof(File, { message: "please select a valid file" })),
	userId: z.string(),
});

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, "/photos");
	}

	return { user: locals.user };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());

		const { data, error, success } = productSchema.safeParse({
			...form,
			userId: locals.user.id,
		});
		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors)[0] });
		}

		// convert image to string so it can be stored inside the database
		// NOTE: render does not support storing files on disk, afaik
		try {
			const base64urlImage = (
				await sharp(await data.image.arrayBuffer())
					.resize({ width: 350, height: 320 })
					.webp()
					.toBuffer()
			).toString("base64");

			// reassign image string to the blob
			data.image = base64urlImage as unknown as File;
		} catch (error) {
			console.log(error);
			return fail(400, {
				message: "error converting your image, use another image",
			});
		}

		try {
			await db.product.create({
				data: {
					image: String(data.image),
					description: data.description,
					title: data.title,
					price: data.price,
					userId: data.userId,
				},
			});
		} catch (error: any) {
			console.log(error);
			return fail(400, { message: error.message });
		}

		redirect(307, "/");
	},
};
