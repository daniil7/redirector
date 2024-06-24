import fs from "node:fs";
import sqlite3 from "sqlite3";
import { error } from "@sveltejs/kit";

const DATABASE_DIRECTORY = "./database";
const DATABASE_PATH = `${DATABASE_DIRECTORY}/sqlite3.db`;

function createTables(newdb) {
	newdb.exec(
		`
    create table links (
        internal_route text primary key not null,
        foreign_url text not null
    );
    insert into links (internal_route, foreign_url)
        values
            ("test1", "https://google.ru"),
            ("test2", "https://ya.ru");
        `,
		() => {},
	);
}

export function connect() {
	if (!fs.existsSync(DATABASE_DIRECTORY)) {
		fs.mkdirSync(DATABASE_DIRECTORY, { recursive: true });
	}
	let notExists = false;
	if (!fs.existsSync(DATABASE_PATH)) {
		notExists = true;
	}

	const db = new sqlite3.Database(DATABASE_PATH, (err) => {
		if (err) {
			error(500, err.message);
		}
	});

	if (notExists) {
		createTables(db);
	}

	return db;
}

export function queryAll(db) {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM links";
		return db.all(sql, [], (err, rows) => {
			if (err) {
				return reject(err.message);
			}
			return resolve(rows);
		});
	});
}

export function findLink(db, internal_route) {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM links WHERE internal_route=?";
		return db.get(sql, [internal_route], (err, row) => {
			if (err) {
				return reject(err.message);
			}
			return resolve(row);
		});
	});
}

export function addLink(db, internal_route, foreign_url) {
	return new Promise((resolve, reject) => {
		const sql = "INSERT INTO links (internal_route, foreign_url) VALUES (?, ?)";
		return db.run(sql, [internal_route, foreign_url], (err) => {
			if (err) {
				return reject(err.message);
			}
			return resolve("done");
		});
	});
}

export function deleteLink(db, internal_route) {
	return new Promise((resolve, reject) => {
		const sql = "DELETE FROM links WHERE internal_route=?";
		return db.run(sql, [internal_route], (err) => {
			if (err) {
				return reject(err.message);
			}
			return resolve("done");
		});
	});
}
