<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { enhance } from '$app/forms';
	import type { SignUpSuccess } from './+page.server';

	let loading = $state(false);
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm">
		<Card.Root>
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>Enter your information below to create your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return async ({ result, update }) => {
							loading = false;
							if (result.type === 'success') {
								const data = result.data as SignUpSuccess;
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
						<Field.Field>
							<Field.Label for="name">Full Name</Field.Label>
							<Input id="name" name="name" type="text" placeholder="John Doe" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input id="email" name="email" type="email" placeholder="you@domain.com" required />
							<Field.Description>
								We'll use this to contact you. We will not share your email with anyone else.
							</Field.Description>
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input id="password" name="password" type="password" required />
							<Field.Description>Must be at least 8 characters long.</Field.Description>
						</Field.Field>
						<Field.Group>
							<Field.Field>
								<Button type="submit">
									{#if loading}
										<Spinner />
									{/if}
									Create Account
								</Button>
								<Field.Description class="px-6 text-center">
									Already have an account? <a href="/login">Sign in</a>
								</Field.Description>
							</Field.Field>
						</Field.Group>
					</Field.Group>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
