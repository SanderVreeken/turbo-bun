import { json } from '@sveltejs/kit';

const API_BASE = process.env.API_URL;

export async function GET({ request }) {
	const res = await fetch(`${API_BASE}/todos/getAll`, {
		headers: {
			cookie: request.headers.get('cookie') || ''
		}
	});

	const data = await res.json();

	return json(data);
}
