import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables and make them available to all Node.js processes
const rootEnv = dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const localEnv = dotenv.config({ path: path.resolve(__dirname, '.env') });

// Ensure environment variables are available during build
Object.assign(process.env, rootEnv.parsed, localEnv.parsed);

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
