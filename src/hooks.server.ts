import { JWT_SECRET_KEY } from "$env/static/private";
import type { User } from "$lib/types";
import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get("user");

	if (!token) {
		return await resolve(event);
	}

	const payload = jwt.verify(token, JWT_SECRET_KEY);
	event.locals.user = payload as User;

	return await resolve(event);
};
