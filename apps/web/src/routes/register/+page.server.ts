import { svelteAuth } from '@/auth-server';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		console.log(data);

		const response = await svelteAuth.api.signUpEmail({
			body: {
				name: data.get('name') as string,
				email: data.get('email') as string,
				password: data.get('password') as string
			}
		});

		console.log(response);
	}
};
