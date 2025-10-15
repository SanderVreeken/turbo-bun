<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	import type { SignInSuccess } from './+page.server';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';

	export let form: ActionData;
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm">
		<Card.Root>
			<Card.Header>
				<Card.Title>Sign in to your account</Card.Title>
				<Card.Description>Enter your information below to sign in</Card.Description>
			</Card.Header>

			<Card.Content>
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								const data = result.data as SignInSuccess;
								if (data && data.success) {
									await goto(data.redirectUrl);
									return;
								}
							}
							await update();
						};
					}}
				>
					<Field.Group>
						{#if form?.message}
							<Alert.Root variant="destructive">
								<AlertCircleIcon />
								<Alert.Title>Error</Alert.Title>
								<Alert.Description>
									<p>{form.message}</p>
								</Alert.Description>
							</Alert.Root>
						{/if}
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="you@domain.com"
								value={form?.email ?? ''}
								required
							/>
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input id="password" name="password" type="password" required />
						</Field.Field>
						<Field.Field>
							<Button type="submit" class="w-full">Sign In</Button>
						</Field.Field>
						<Field.Field>
							<Field.Description class="px-6 text-center text-sm">
								Don't have an account yet? <a href="/register" class="underline">Create one</a>
							</Field.Description>
						</Field.Field>
					</Field.Group>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
