import db from "$lib/prisma.ts";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import * as v from "valibot";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";
import type { User } from "$lib/types";

const loginSchema = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(2, "username must be 2 or more letters"),
	),
	password: v.pipe(
		v.string(),
		v.minLength(4, "password must be 4 or more characters"),
	),
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// Get the data from the form
		const form = Object.fromEntries(
			await request.formData(),
		) as unknown as User;

		// validate the incoming data
		const { output, issues, success } = v.safeParse(loginSchema, form, {
			abortEarly: true,
		});
		if (!success) {
			const errors = issues.map((issue) => issue.message);
			return fail(400, { message: errors[0] });
		}

		// check if the user exists in the database
		const user = await db.user.findUnique({
			where: { username: output.username },
		});

		try {
			// if no user found or password does not match then return error message
			if (!user || !(await bcrypt.compare(output.password, user.password))) {
				return fail(400, { message: "Invalid username or password!!" });
			}

			const payload = jwt.sign(
				{ id: user.id, username: user.username },
				JWT_SECRET_KEY,
			);

			cookies.set("user", payload, { path: "/", secure: true });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (_e: any) {
			return fail(400, { message: _e.message });
		}

		redirect(307, "/photos");
	},
};
