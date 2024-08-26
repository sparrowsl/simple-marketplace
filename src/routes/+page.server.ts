import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	return { user: locals.user };
};

export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("user", { path: "/" });
		redirect(307, "/photos");
	},
};
