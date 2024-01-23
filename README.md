# Clerk SvelteKit

Adapter for using [Clerk](https://clerk.com/) authentication in [SvelteKit](https://kit.svelte.dev/).

[Demo](https://clerk-sveltekit.markjaquith.com/)

The demo site is just this repository, hosted on Cloudflare Pages.

## Installation

### Install package

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

### Set up environment variables

Add these values to your `.env` (get them from Clerk after creating an application there):

```env
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abcdefg123
CLERK_SECRET_KEY=sk_test_abcdefg123
```

The easiest way to get these values is to click "API Keys" in the Clerk dashboard, and then copy the values for Next.js, and change `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `PUBLIC_CLERK_PUBLISHABLE_KEY`.

Note that for production sites using OAuth providers, you will have to do some more setup with Clerk and DNS.

### Configure the server hook

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

### Configure the client hook

Add this to `src/hooks.client.ts`:

```typescript
import type { HandleClientError } from '@sveltejs/kit'
// To use Clerk components:
import { initializeClerkClient } from 'clerk-sveltekit/client'
// Or for headless mode:
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
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

Customize the protected paths, and the various URLs as you like.

> [!NOTE]
> If you use `clerk-sveltekit/headless` instead of `clerk-sveltekit/client`, your bundle will be much smaller (by about 1MB), but you will not have access to `<SignIn />`, `<SignUp />`, `<UserProfile />`, `<UserButton />`, `<OrganizationProfile />`, `<OrganizationSwitcher />`, or `<CreateOrganization />`. Sign-ins will have to happen on your `accounts.{TLD}` subdomain.

### Use the components

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

## Components

All components can be imported from `clerk-sveltekit/client/ComponentName.svelte`

- `<ClerkLoading />` — Wrapper that shows its contents when Clerk is still loading.
- `<ClerkLoaded let:clerk />` — Wrapper that shows its contents (and exposes the `clerk` object) when Clerk is done loading.
- `<SignIn />` — Renders a sign-in form.
- `<SignUp />` — Renders a sign-up form.
- `<SignedIn let:user />` — Wrapper that shows its contents (and exposes the Clerk `user` object) when the user is signed in.
- `<SignedOut />` — Wrapper that shows its contents when the user is not signed in.
- `<UserButton />` — Button that shows the user’s profile photo with log out link when they are signed in.
- `<UserProfile />` — Renders the current user’s profile.
- `<SignInButton />` — Unstyled sign-in button (can do `mode="modal"` too).
- `<SignUpButton />` — Unstyled sign-up button (can do `mode="modal"` too).
- `<SignOutButton />` — Unstyled sign-out button.
- `<OrganizationProfile />` — Renders the organization profile component.
- `<OrganizationSwitcher />` — Renders an organization switcher component.
- `<CreateOrganization />` — Renders UI for creating an organization.

Note that components should be used for displaying UI, but are not sufficient for protecting routes. To protect a route, use the `protectedPaths` option passed to `handleClerk()` in your `hooks.server.ts` file.

## Protected Routes

The `protectedPaths` option will accept an array of either strings, or functions which accept a SvelteKit event object and return a boolean. When passed strings, any route that _starts_ with that string will be protected. i.e. protecting `'/admin'` will protect `/admin` but also `/admin/foo`.

## Using Clerk data on the server

Server-side protected routes will automatically get a [Clerk user object](https://clerk.com/docs/references/javascript/user/user) injected into `locals.session` which means you can use it [in a `load()` function](https://kit.svelte.dev/docs/form-actions#loading-data), a [default action](https://kit.svelte.dev/docs/form-actions#default-actions), or a [form action](https://kit.svelte.dev/docs/form-actions).

## Thanks

Thanks to Cerbos for their [https://github.com/cerbos/sveltekit-clerk-cerbos](sveltekit-clerk-cerbos) example repo which got this project started, and to [Brian Bug](https://thebrianbug.com/) for fixing bugs in that implementation.
