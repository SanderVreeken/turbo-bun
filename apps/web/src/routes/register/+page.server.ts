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

export interface SignUpFormData {
	message: string;
	email?: string;
	fieldErrors?: Record<string, string>;
}

export interface SignUpSuccess extends Record<string, unknown> {
	success: true;
	redirectUrl: string;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// TODO: Implement zod validation via db package

		try {
			await svelteAuth.api.signUpEmail({
				body: { name, email, password, callbackURL: `${process.env.WEB_URL}/login` }
			});

			return {
				success: true,
				redirectUrl: '/login?message=Please check your email to verify your account'
			} satisfies SignUpSuccess;
		} catch (error: unknown) {
			const betterAuthError = error as Partial<BetterAuthError>;
			const statusCode = betterAuthError.statusCode ?? 400;
			const message = betterAuthError.body?.message ?? 'Sign up failed';

			return fail<SignUpFormData>(statusCode, { message, email });
		}
	}
};
