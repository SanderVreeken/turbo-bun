import type { Task } from '@repo/db/schema';
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

export const actions = {
	default: async ({ request }) => {
		const client = hc<TasksRouterType>(process.env.API_URL!, {
			init: {
				headers: {
					// Makes sure the session cookie is sent
					Cookie: request.headers.get('cookie') || '',
					'Content-Type': 'application/json'
				}
			}
		});

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const status = formData.get('status') as Task['status'];
		const priority = formData.get('priority') as Task['priority'];

		const response = await client.tasks.add.$post({
			json: {
				title,
				description,
				status,
				priority
			}
		});

		if (!response.ok) {
			return { success: false, error: 'Failed to add task' };
		}

		const task = await response.json();

		return { success: true, task };
	}
};
