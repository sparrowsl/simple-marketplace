import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, "/");
	}

	return { user: locals.user };
};

export const actions: Actions = {
	default: () => {
		return { message: "purchase has been completed successfully" };
	},
};
