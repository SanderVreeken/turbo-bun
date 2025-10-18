import { svelteAuth } from '@/auth-server';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const response = await svelteKitHandler({ event, resolve, auth: svelteAuth, building });

	if (building) return response;

	const { pathname } = event.url;

	// Permanent redirects for legacy routes
	if (pathname === '/login') {
		throw redirect(301, '/auth/login');
	}
	if (pathname === '/register') {
		throw redirect(301, '/auth/register');
	}

	// Check if current session is active
	const session = await svelteAuth.api.getSession({
		headers: event.request.headers
	});

	const isAuthenticated = !!session?.session;

	// Redirect logic for /app routes
	if (pathname.startsWith('/app')) {
		if (!isAuthenticated) {
			throw redirect(302, '/auth/login');
		}
	}

	// Redirect logic for /auth routes
	if (pathname.startsWith('/auth')) {
		if (isAuthenticated) {
			throw redirect(302, '/app');
		}
	}

	return response;
}
