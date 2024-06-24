import { json } from "@sveltejs/kit";
import * as database from "$lib/server/database.js";
import * as validators from "$lib/server/validators.js";

export async function POST({ request, cookies }) {
	const { internal_route, foreign_url } = await request.json();
    if (!validators.isValidInternal(internal_route)) {
        return json({ status: 400, message: "invalid internal route" });
    }
    if (!validators.isValidUrl(foreign_url)) {
        return json({ status: 400, message: "invalid foreign URL" });
    }
	const db = database.connect();
	const link = await database.addLink(db, internal_route, foreign_url);
	return json({ status: 201 });
}
