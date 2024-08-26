import db from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const photos = await db.photos.findMany({
		orderBy: {
			id: "desc",
		},
	});

	return { photos, user: locals.user };
};
