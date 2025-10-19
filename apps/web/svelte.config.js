import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from root .env file and make them available to Node.js
const rootEnv = dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
const localEnv = dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Ensure environment variables are available during build
Object.assign(process.env, rootEnv.parsed, localEnv.parsed);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'@/*': './src/lib/*',
			$lib: './src/lib',
			'$lib/*': './src/lib/*'
		}
	}
};

export default config;
