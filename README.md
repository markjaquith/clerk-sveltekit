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

The easiest way to get these values is to click "API Keys" in the Clerk dashboard, and then copy the values for Next.js, and change `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `PUBLIC_CLERK_PUBLISHABLE_KEY`.

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
	})
)
```

Add this to `src/hooks.client.ts`:

```typescript
import type { HandleClientError } from '@sveltejs/kit'
import { initializeClerkClient } from 'clerk-sveltekit'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
```

Customize the protected paths, and the various URLs.

Next, put the `SignIn` component on your sign in page:

```svelte
<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<div>
	<SignIn redirectUrl="/admin" />
</div>
```

And put the `SignUp` component on your sign up page:

```svelte
<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<div>
	<SignUp redirectUrl="/admin" />
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
	<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
</SignedOut>
```

### Components

All components can be imported from `clerk-sveltekit/client/ComponentName.svelte`

- `&lt;ClerkLoading /&gt;` — Wrapper that shows its contents when Clerk is still loading.
- `&lt;ClerkLoaded let:clerk /&gt;` — Wrapper that shows its contents (and exposes the `clerk` object) when Clerk is done loading.
- `&lt;SignIn /&gt;` — Renders a sign-in form.
- `&lt;SignUp /&gt;` — Renders a sign-up form.
- `&lt;SignedIn let:user /&gt;` — Wrapper that shows its contents (and exposes the Clerk `user` object) when the user is signed in.
- `&lt;SignedOut /&gt;` — Wrapper that shows its contents when the user is not signed in.
- `&lt;UserButton /&gt;` — Button that shows the user’s profile photo with log out link when they are signed in.
- `&lt;UserProfile /&gt;` — Renders the current user’s profile.
- `&lt;SignInButton /&gt;` — Unstyled sign-in button (can do `mode="modal"` too).
- `&lt;SignUpButton /&gt;` — Unstyled sign-up button (can do `mode="modal"` too).
- `&lt;SignOutButton /&gt;` — Unstyled sign-out button.

Note that components should be used for displaying UI, but are not sufficient for protecting routes. To protect a route, use the `protectedRoutes` option passed to `handleClerk()` in your `hooks.server.ts` file.

### Protected Routes

The `protectedRoutes` option will accept an array of either strings, or functions which accept a SvelteKit event object and return a boolean. When passed strings, any route that _starts_ with that string will be protected. i.e. protecting `'/admin'` will protect `/admin` but also `/admin/foo`.

### Thanks

Thanks to Cerbos for their [https://github.com/cerbos/sveltekit-clerk-cerbos](sveltekit-clerk-cerbos) example repo which got this project started, and to [Brian Bug](https://thebrianbug.com/) for fixing bugs in that implementation.
