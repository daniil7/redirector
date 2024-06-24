import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import * as database from "$lib/server/database";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (params.slug) {
		const db = database.connect();
		const link = await database.findLink(db, params.slug);
		if (link) {
			redirect(302, link.foreign_url);
		}
	}

	error(404, "Not found");
}
