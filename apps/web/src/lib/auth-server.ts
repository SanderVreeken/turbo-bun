import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { auth } from '@repo/auth';

export function createSvelteKitAuth() {
	return betterAuth({
		...auth.options,
		plugins: [...auth.options.plugins, sveltekitCookies(getRequestEvent)]
	});
}

export const svelteAuth = createSvelteKitAuth();
