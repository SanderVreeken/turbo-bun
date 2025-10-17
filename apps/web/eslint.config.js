import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { config } from '@repo/eslint-config/svelte';

export default [
	...config,
	{ ignores: ['.svelte-kit/*', 'build/*', 'src/lib/components/ui/*', 'src/lib/hooks/*'] },
	prettier,
	...svelte.configs.prettier
];
