import db from "$lib/prisma.ts";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import * as v from "valibot";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";
import type { User } from "$lib/types";

const signupSchema = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(2, "username must be 2 or more characters"),
	),
	password: v.pipe(
		v.string(),
		v.minLength(4, "password must be 4 or more characters"),
	),
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(
			await request.formData(),
		) as unknown as User;

		// validate the input data
		const { output, issues, success } = v.safeParse(signupSchema, form, {
			abortEarly: true,
		});

		if (!success) {
			const errors = issues.map((issue) => issue.message);
			return fail(400, { message: errors[0] });
		}

		try {
			// check if the user exists in the database
			const usernameExists = await db.user.findUnique({
				where: { username: output.username },
			});
			if (usernameExists) {
				return fail(400, { message: "username already taken!!" });
			}
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.log(error);
			return fail(500, { message: error.message });
		}

		try {
			const hashedPassword = await bcrypt.hash(output.password, 12);

			const user = await db.user.create({
				data: {
					username: output.username,
					password: hashedPassword,
				},
				omit: {
					password: true,
				},
			});

			// JWT the user info
			const payload = jwt.sign(user, JWT_SECRET_KEY);

			cookies.set("user", payload, { path: "/", secure: true });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.log(error.message);
			return fail(400, { message: error.message });
		}

		redirect(307, "/photos");
	},
};
