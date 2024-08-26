import db from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";
import type { User } from "$lib/types";
import type { Actions } from "./$types";

const loginSchema = z.object({
	email: z.string().email().trim(),
	password: z
		.string()
		.min(4, { message: "password must be 4 or more characters" }),
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// Get the data from the form
		const form = Object.fromEntries(
			await request.formData(),
		) as unknown as User;

		// validate the incoming data
		const { data, error, success } = loginSchema.safeParse(form);
		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors)[0] });
		}

		// check if the user exists in the database
		const user = await db.user.findUnique({
			where: { email: data.email },
		});

		try {
			// if no user found or password does not match then return error message
			if (!user || !(await bcrypt.compare(data.password, user.password))) {
				return fail(400, { message: "Invalid username or password!!" });
			}

			const payload = jwt.sign(
				{ id: user.id, email: user.email, name: user.name },
				JWT_SECRET_KEY,
			);

			cookies.set("user", payload, { path: "/", secure: true });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (_e: any) {
			return fail(400, { message: _e.message });
		}

		redirect(307, "/");
	},
};
