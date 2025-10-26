<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import KanbanBoard from '$lib/components/kanban-board.svelte';
	import { tasks } from '@/stores/tasks.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		tasks.set(data.tasks);
	});
</script>

<Sidebar.Provider>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Page class="line-clamp-1">
							Project Management & Task Tracking
						</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<Sidebar.Trigger class="-mr-1 ml-auto rotate-180" />
		</header>
		<KanbanBoard />
	</Sidebar.Inset>
	<AppSidebar side="right" />
</Sidebar.Provider>
