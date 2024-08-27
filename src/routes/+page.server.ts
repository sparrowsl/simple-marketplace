import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	const products = await db.product.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return { user: locals.user, products };
};

export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("user", { path: "/" });
		redirect(307, "/");
	},
};
