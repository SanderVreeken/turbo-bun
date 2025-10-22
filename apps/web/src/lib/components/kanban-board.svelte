<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Plus, Pencil, Trash2 } from '@lucide/svelte';

	interface Task {
		id: string;
		title: string;
		description: string;
		status: 'todo' | 'in-progress' | 'review' | 'done';
		priority: 'low' | 'medium' | 'high';
		createdAt: Date;
	}

	interface Column {
		id: string;
		title: string;
		status: 'todo' | 'in-progress' | 'review' | 'done';
		color: string;
	}

	let tasks: Task[] = $state([
		{
			id: '1',
			title: 'Design new landing page',
			description: 'Create wireframes and mockups for the new landing page design',
			status: 'todo',
			priority: 'high',
			createdAt: new Date('2024-01-15')
		},
		{
			id: '2',
			title: 'Implement user authentication',
			description: 'Add login and registration functionality with JWT tokens',
			status: 'in-progress',
			priority: 'high',
			createdAt: new Date('2024-01-16')
		},
		{
			id: '3',
			title: 'Write API documentation',
			description: 'Document all REST endpoints with examples and schema',
			status: 'review',
			priority: 'medium',
			createdAt: new Date('2024-01-17')
		},
		{
			id: '4',
			title: 'Setup CI/CD pipeline',
			description: 'Configure automated testing and deployment pipeline',
			status: 'done',
			priority: 'medium',
			createdAt: new Date('2024-01-14')
		},
		{
			id: '5',
			title: 'Update dependencies',
			description: 'Update all npm packages to latest stable versions',
			status: 'todo',
			priority: 'low',
			createdAt: new Date('2024-01-18')
		},
		{
			id: '6',
			title: 'Fix mobile responsive issues',
			description: 'Resolve layout problems on mobile devices',
			status: 'in-progress',
			priority: 'medium',
			createdAt: new Date('2024-01-19')
		}
	]);

	const columns: Column[] = [
		{ id: 'todo', title: 'To Do', status: 'todo', color: '' },
		{ id: 'in-progress', title: 'In Progress', status: 'in-progress', color: '' },
		{ id: 'review', title: 'Review', status: 'review', color: '' },
		{ id: 'done', title: 'Done', status: 'done', color: '' }
	];

	let showNewTaskDialog = $state(false);
	let showEditTaskDialog = $state(false);
	let editingTask: Task | null = $state(null);
	let newTask = $state({
		title: '',
		description: '',
		priority: 'medium' as Task['priority'],
		status: 'todo' as Task['status']
	});

	function getTasksForColumn(status: Task['status']) {
		return tasks.filter((task) => task.status === status);
	}

	function getPriorityColor(priority: Task['priority']) {
		switch (priority) {
			case 'high':
				return 'border-l-destructive';
			case 'medium':
				return 'border-l-yellow-500';
			case 'low':
				return 'border-l-green-500';
			default:
				return 'border-l-muted';
		}
	}

	function getPriorityBadgeColor(priority: Task['priority']) {
		switch (priority) {
			case 'high':
				return 'bg-destructive/10 text-destructive border-destructive/20';
			case 'medium':
				return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
			case 'low':
				return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
			default:
				return 'bg-muted text-muted-foreground border-border';
		}
	}

	function createTask() {
		if (!newTask.title.trim()) return;

		const task: Task = {
			id: Date.now().toString(),
			title: newTask.title,
			description: newTask.description,
			status: newTask.status,
			priority: newTask.priority,
			createdAt: new Date()
		};

		tasks = [...tasks, task];
		resetNewTask();
		showNewTaskDialog = false;
	}

	function updateTask(task: Task) {
		const index = tasks.findIndex((t) => t.id === task.id);
		if (index !== -1) {
			tasks[index] = task;
			tasks = [...tasks];
		}
		editingTask = null;
		showEditTaskDialog = false;
	}

	function deleteTask(taskId: string) {
		tasks = tasks.filter((t) => t.id !== taskId);
	}

	function moveTask(taskId: string, newStatus: Task['status']) {
		const task = tasks.find((t) => t.id === taskId);
		if (task) {
			task.status = newStatus;
			tasks = [...tasks];
		}
	}

	function resetNewTask() {
		newTask = {
			title: '',
			description: '',
			priority: 'medium',
			status: 'todo'
		};
	}

	function startEditing(task: Task) {
		editingTask = { ...task };
		showEditTaskDialog = true;
	}

	function cancelEdit() {
		editingTask = null;
		showEditTaskDialog = false;
	}

	function handleDragStart(event: DragEvent, taskId: string) {
		if (event.dataTransfer) {
			event.dataTransfer.setData('text/plain', taskId);
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent, status: Task['status']) {
		event.preventDefault();
		const taskId = event.dataTransfer?.getData('text/plain');
		if (taskId) {
			moveTask(taskId, status);
		}
	}
</script>

<div class="flex flex-1 flex-col gap-6 p-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight">Kanban Board Title</h1>
		<Button onclick={() => (showNewTaskDialog = true)} class="gap-2">
			<Plus class="h-4 w-4" />
			Add Task
		</Button>
	</div>

	<!-- Kanban Board -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		{#each columns as column (column.id)}
			<div
				class="flex flex-col gap-4 rounded-lg border bg-card p-4"
				role="region"
				aria-label="{column.title} column"
				ondragover={handleDragOver}
				ondrop={(e) => handleDrop(e, column.status)}
			>
				<div class="flex items-center justify-between">
					<h2 class="font-semibold text-lg text-card-foreground">{column.title}</h2>
					<span
						class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground"
					>
						{getTasksForColumn(column.status).length}
					</span>
				</div>

				<div class="flex flex-col gap-3">
					{#each getTasksForColumn(column.status) as task (task.id)}
						<Card.Root
							class="cursor-move border-l-4 {getPriorityColor(
								task.priority
							)} transition-all hover:shadow-md"
							draggable="true"
							ondragstart={(e) => handleDragStart(e, task.id)}
						>
							<Card.Content class="space-y-3">
								<div class="flex items-start justify-between gap-2">
									<div class="flex-1 space-y-2">
										<h3 class="font-medium text-sm leading-none">{task.title}</h3>
										{#if task.description}
											<p class="text-xs text-muted-foreground leading-relaxed">
												{task.description}
											</p>
										{/if}
									</div>
								</div>
								<div class="flex items-center justify-between">
									<span
										class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium capitalize {getPriorityBadgeColor(
											task.priority
										)}"
									>
										{task.priority}
									</span>
									<div class="flex gap-1">
										<Button
											size="icon-sm"
											variant="ghost"
											onclick={() => startEditing(task)}
											class="h-6 w-6"
										>
											<Pencil class="h-3 w-3" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onclick={() => deleteTask(task.id)}
											class="h-6 w-6 text-destructive hover:text-destructive"
										>
											<Trash2 class="h-3 w-3" />
										</Button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- New Task Dialog -->
	<Dialog.Root bind:open={showNewTaskDialog}>
		<Dialog.Content class="sm:max-w-md">
			<Dialog.Header>
				<Dialog.Title>Add New Task</Dialog.Title>
				<Dialog.Description>Create a new task and assign it to a column.</Dialog.Description>
			</Dialog.Header>

			<div class="space-y-6 py-6">
				<div class="space-y-2">
					<Label for="new-title">Title</Label>
					<Input id="new-title" bind:value={newTask.title} placeholder="Enter task title" />
				</div>

				<div class="space-y-2">
					<Label for="new-description">Description</Label>
					<textarea
						id="new-description"
						bind:value={newTask.description}
						class="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="Enter task description"
					></textarea>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="new-priority">Priority</Label>
						<select
							id="new-priority"
							bind:value={newTask.priority}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>

					<div class="space-y-2">
						<Label for="new-status">Status</Label>
						<select
							id="new-status"
							bind:value={newTask.status}
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="todo">To Do</option>
							<option value="in-progress">In Progress</option>
							<option value="review">Review</option>
							<option value="done">Done</option>
						</select>
					</div>
				</div>
			</div>

			<Dialog.Footer>
				<Button
					variant="outline"
					onclick={() => {
						showNewTaskDialog = false;
						resetNewTask();
					}}
				>
					Cancel
				</Button>
				<Button onclick={createTask}>Create Task</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<!-- Edit Task Dialog -->
	<Dialog.Root bind:open={showEditTaskDialog}>
		<Dialog.Content class="sm:max-w-md">
			<Dialog.Header>
				<Dialog.Title>Edit Task</Dialog.Title>
				<Dialog.Description>Update task details and change its status.</Dialog.Description>
			</Dialog.Header>

			{#if editingTask}
				<div class="space-y-6 py-6">
					<div class="space-y-2">
						<Label for="edit-title">Title</Label>
						<Input id="edit-title" bind:value={editingTask.title} placeholder="Enter task title" />
					</div>

					<div class="space-y-2">
						<Label for="edit-description">Description</Label>
						<textarea
							id="edit-description"
							bind:value={editingTask.description}
							class="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="Enter task description"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="edit-priority">Priority</Label>
							<select
								id="edit-priority"
								bind:value={editingTask.priority}
								class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>

						<div class="space-y-2">
							<Label for="edit-status">Status</Label>
							<select
								id="edit-status"
								bind:value={editingTask.status}
								class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="todo">To Do</option>
								<option value="in-progress">In Progress</option>
								<option value="review">Review</option>
								<option value="done">Done</option>
							</select>
						</div>
					</div>
				</div>

				<Dialog.Footer>
					<Button variant="outline" onclick={cancelEdit}>Cancel</Button>
					<Button onclick={() => updateTask(editingTask!)}>Update Task</Button>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
</div>
