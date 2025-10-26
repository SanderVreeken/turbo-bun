// src/lib/stores/kanban.ts
import type { Todo } from '@repo/db/schema';
import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([]);
