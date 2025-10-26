import type { TasksRouterType } from '@turbo-bun/api';
import { hc } from 'hono/client';

export const load = async ({ request }) => {
	const client = hc<TasksRouterType>(process.env.API_URL!, {
		init: {
			headers: {
				// Makes sure the session cookie is sent
				Cookie: request.headers.get('cookie') || ''
			}
		}
	});

	const response = await client.tasks.getAll.$get();

	const tasks = await response.json();

	return { tasks };
};
