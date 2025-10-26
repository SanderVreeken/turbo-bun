// src/lib/stores/kanban.ts
import type { Task } from '@repo/db/schema';
import { writable } from 'svelte/store';

export const tasks = writable<Task[]>([]);
