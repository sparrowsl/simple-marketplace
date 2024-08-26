import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";
import type { User } from "$lib/types";
import db from "$lib/prisma";

const signupSchema = z.object({
	name: z.string().trim().min(2, { message: "name is too short" }),
	email: z.string().email(),
	password: z
		.string()
		.min(4, { message: "password must be 4 or more characters" }),
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(
			await request.formData(),
		) as unknown as User;

		// validate the input data
		const { data, error, success } = signupSchema.safeParse(form);
		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors)[0] });
		}

		try {
			// check if the user exists in the database
			const emailExists = await db.user.findUnique({
				where: { email: data.email },
			});
			if (emailExists) {
				return fail(400, { message: "email already taken!!" });
			}
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.log(error);
			return fail(500, { message: error.message });
		}

		try {
			const hashedPassword = await bcrypt.hash(data.password, 12);

			const user = await db.user.create({
				data: {
					name: data.name,
					email: data.email,
					password: hashedPassword,
				},
				// omit: {
				// 	password: true,
				// },
			});

			// JWT the user info
			const payload = jwt.sign(user, JWT_SECRET_KEY);

			cookies.set("user", payload, { path: "/", secure: true });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.log(error.message);
			return fail(400, { message: error.message });
		}

		redirect(307, "/");
	},
};
