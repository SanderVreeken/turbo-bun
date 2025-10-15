import { svelteAuth } from '@/auth-server';
import { fail, type Actions } from '@sveltejs/kit';

interface AuthErrorBody {
	code?: string;
	message: string;
	errors?: Record<string, string>;
}

interface BetterAuthError {
	statusCode: number;
	body: AuthErrorBody;
}

export interface SignInFormData {
	message: string;
	email?: string;
	fieldErrors?: Record<string, string>;
}

export interface SignInSuccess extends Record<string, unknown> {
	success: true;
	redirectUrl: string;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail<SignInFormData>(400, {
				message: 'Email and password are required.',
				email
			});
		}

		try {
			await svelteAuth.api.signInEmail({
				body: { email, password },
				headers: Object.fromEntries(request.headers)
			});

			return { success: true, redirectUrl: '/app' } satisfies SignInSuccess;
		} catch (error: unknown) {
			const betterAuthError = error as Partial<BetterAuthError>;
			const statusCode = betterAuthError.statusCode ?? 400;
			const message =
				betterAuthError.body?.message ?? 'Sign in failed. Please check your credentials.';

			return fail<SignInFormData>(statusCode, { message, email });
		}
	}
};
