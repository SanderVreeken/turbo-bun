import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { config } from '@repo/eslint-config/svelte';

export default [
	...config,
	{ ignores: ['.svelte-kit/*', 'build/*'] },
	prettier,
	...svelte.configs.prettier
];
