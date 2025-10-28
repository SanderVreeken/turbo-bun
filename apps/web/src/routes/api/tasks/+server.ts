import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { TasksRouterType } from '@turbo-bun/api';
import { hc } from 'hono/client';

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, ...updates } = await request.json();

	if (!id) {
		throw error(400, { message: 'Task ID is required' });
	}

	const client = hc<TasksRouterType>(process.env.API_URL!, {
		init: {
			headers: {
				Cookie: request.headers.get('cookie') || '',
				'Content-Type': 'application/json'
			}
		}
	});

	const response = await client.tasks[':id'].$patch({
		param: { id },
		json: updates
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw error(response.status, errorData);
	}

	const task = await response.json();

	return json(task);
};
