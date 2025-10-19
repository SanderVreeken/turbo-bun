<script lang="ts" module>
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';

	const data = {
		teams: [
			{
				name: 'My Projects',
				logo: GalleryVerticalEndIcon,
				plan: 'Free'
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#'
			},
			{
				name: 'Sales & Marketing',
				url: '#'
			},
			{
				name: 'Travel',
				url: '#'
			}
		]
	};
</script>

<script lang="ts">
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
