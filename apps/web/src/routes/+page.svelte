<script lang="ts">
    import { authClient } from '$lib/auth-client'

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        try {
            const { data, error } = await authClient.signUp.email({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string
            });

            console.log({ data, error })
        } catch (error: unknown) {
            alert('Login failed: ' + (error instanceof Error ? error.message : String(error)))
        }
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
    <form on:submit={handleSubmit}>
        <input name='name' placeholder='Name' />
        <input name='email' placeholder='Email' />
        <input name='password' type='password' placeholder='Password' />
        <button type='submit' formmethod='post'>Login</button>
    </form>
</div>
