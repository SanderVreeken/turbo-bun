<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		try {
			const { data, error } = await authClient.signUp.email({
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				password: formData.get('password') as string
			});

			console.log({ data, error });
		} catch (error: unknown) {
			alert('Login failed: ' + (error instanceof Error ? error.message : String(error)));
		}
	}
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm">
		<Card.Root>
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>Enter your information below to create your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<form on:submit={handleSubmit}>
					<Field.Group>
						<Field.Field>
							<Field.Label for="name">Full Name</Field.Label>
							<Input id="name" name="name" type="text" placeholder="John Doe" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
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
								<Button type="submit">Create Account</Button>
								<Field.Description class="px-6 text-center">
									Already have an account? <a href="#/">Sign in</a>
								</Field.Description>
							</Field.Field>
						</Field.Group>
					</Field.Group>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
