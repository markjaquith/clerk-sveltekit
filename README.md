# Clerk SvelteKit

Adapter for using Clerk authentication in SvelteKit.

## Installation

```
# npm
npm i clerk-sveltekit

# pnpm
pnpm i clerk-sveltekit

# yarn
yarn add clerk-sveltekit

# bun
bun i clerk-sveltekit
```

Add these values to your `.env` (get them from Clerk after creating an application there):

```env
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abcdefg123
CLERK_SECRET_KEY=sk_test_abcdefg123
```

Add this to `src/hooks.server.ts` (or integrate this code with your existing `hooks.server.ts` file):

```typescript
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { CLERK_SECRET_KEY } from '$env/static/private'

export const handle: Handle = sequence(
	handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/admin'],
		signInUrl: '/sign-in',
	}),
)
```

Add this to `src/hooks.client.ts`:

```typescript
import type { HandleClientError } from '@sveltejs/kit'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { initializeClerkClient } from 'clerk-sveltekit/client'
import { clerk } from 'clerk-sveltekit/client'

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
})

clerk.subscribe((clerkInstance) => {
	if (clerkInstance) window.Clerk = clerkInstance
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
```

Customize the protected paths, and various URLs.

Next, put the `SignIn` component on your sign in page:

```svelte
<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<div>
	<SignIn afterSignInUrl="/admin" />
</div>
```

And put the `SignUp` component on your sign up page:

```svelte
<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<div>
	<SignUp afterSignUpUrl="/admin" />
</div>
```

Then, where you want to show the signed in user's photo and sign out button (probably in a `+layout.svelte` file in the header):

```svelte
<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
</script>

<SignedIn>
	<UserButton afterSignOutUrl="/" />
</SignedIn>
<SignedOut>
	<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
</SignedOut>
```
