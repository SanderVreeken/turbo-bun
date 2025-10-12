import { svelteAuth } from '@/auth-server';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
	return svelteKitHandler({ event, resolve, auth: svelteAuth, building });
}
