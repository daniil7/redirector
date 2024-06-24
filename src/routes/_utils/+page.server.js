import { error } from "@sveltejs/kit";
import * as database from "$lib/server/database"

/** @type {import('./$types').PageServerLoad} **/
export async function load({ params }) {
    const db = database.connect();
	return {
        allLinks: await database.queryAll(db)
    };
}
