import db from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const product = await db.product.findUnique({
		where: { id: params.id },
		// include: {
		// 	user: {
		// 		omit: {
		// 			password: true,
		// 		},
		// 	},
		// },
	});

	if (!product) {
		error(404, { message: "product does not exist" });
	}

	return { product, user: locals.user };
};
