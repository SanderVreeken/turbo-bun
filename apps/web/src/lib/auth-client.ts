import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: 'https://bun-api.sandervreeken.com', // Adjust if needed
});
