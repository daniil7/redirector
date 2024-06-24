import { json } from "@sveltejs/kit";
import * as database from "$lib/server/database.js";
import * as validators from "$lib/server/validators.js";

export async function POST({ request, cookies }) {
	const { internal_route } = await request.json();
	if (!validators.isValidInternal(internal_route)) {
		return json({ status: 400, message: "invalid internal route" });
	}
	const db = database.connect();
	const link = await database.deleteLink(db, internal_route);
	return json({ status: 201 });
}
