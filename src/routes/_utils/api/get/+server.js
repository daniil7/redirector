import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export async function POST({ request, cookies }) {
	const { internal_route } = await request.json();
    const db = database.connect()
	const link = await database.findLink(db, internal_route);
	return json(link, { status: 201 });
}

