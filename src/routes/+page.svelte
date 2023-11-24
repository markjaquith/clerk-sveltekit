<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'
	import SignedOut from '$lib/client/SignedOut.svelte'
	import SignInButton from '$lib/client/SignInButton.svelte'
	import SignUpButton from '$lib/client/SignUpButton.svelte'
	import Box from '../internal/Box.svelte'
</script>

<p><b>clerk-sveltekit</b> is a JavaScript package that integrates <a href="https://clerk.com/">Clerk</a> authentication into a <a href="https://kit.svelte.dev/">SvelteKit</a> site. This demo site is included in <a href="https://github.com/markjaquith/clerk-sveltekit">the repo</a> as an example and for end-to-end testing the package.</p>

<SignedIn let:user>
	<div class="p-4">
		<Box>
			<p>Welcome, {user?.fullName ?? 'buddy'}!</p>
			<p>Since you are signed in, you should be able to access the <a href="/admin">admin panel</a>.</p>
		</Box>
	</div>
</SignedIn>
<SignedOut>
	<Box>
		<p>You are not signed in to this demo app.</p>
		<p>
			You should not be able to go to the <a href="/admin">admin panel</a> without signing in, because
			it is defined as a protected route in <code>hooks.server.ts</code> — go ahead and try!
		</p>
		<ul class="flex flex-row flex-wrap justify-center gap-2 my-4 whitespace-nowrap">
			<li><SignInButton class="p-2 rounded bg-slate-300">Sign in</SignInButton></li>
			<li><SignUpButton class="p-2 rounded bg-slate-300">Sign up</SignUpButton></li>
			</ul>
		<ul class="flex flex-row flex-wrap justify-center gap-2 whitespace-nowrap">
			<li><SignInButton class="p-2 rounded bg-slate-300" mode="modal">Sign in (modal)</SignInButton></li>
			<li><SignUpButton class="p-2 rounded bg-slate-300" mode="modal">Sign up (modal)</SignUpButton></li>
		</ul>
	</Box>
</SignedOut>

<p>The package offers server-based route protection, login flow, and the following Svelte components:</p>

<ul class="[&_code]:bg-yellow-50 [&_code]:p-1 [&_code]:font-bold list-disc list-outside pl-6 pt-8">
	<li><code>&lt;ClerkLoading /&gt;</code> — Wrapper that shows its contents when Clerk is still loading.</li>
	<li><code>&lt;ClerkLoaded let:clerk /&gt;</code> — Wrapper that shows its contents (and exposes the <code>clerk</code> object) when Clerk is done loading.</li>
	<li><code>&lt;SignIn /&gt;</code> — Renders a sign-in form.</li>
	<li><code>&lt;SignUp /&gt;</code> — Renders a sign-up form.</li>
	<li><code>&lt;SignedIn let:user /&gt;</code> — Wrapper that shows its contents (and exposes the Clerk <code>user</code> object) when the user is signed in.</li>
	<li><code>&lt;SignedOut /&gt;</code> — Wrapper that shows its contents when the user is not signed in.</li>
	<li><code>&lt;UserButton /&gt;</code> — Button that shows the user’s profile photo with log out link when they are signed in.</li>
	<li><code>&lt;UserProfile /&gt;</code> — Renders the current user’s profile.</li>
	<li><code>&lt;SignInButton /&gt;</code> — Unstyled sign-in button (can do <code>mode="modal"</code> too).</li>
	<li><code>&lt;SignUpButton /&gt;</code> — Unstyled sign-up button (can do <code>mode="modal"</code> too).</li>
	<li><code>&lt;SignOutButton /&gt;</code> — Unstyled sign-out button.</li>
	<li><code>&lt;OrganizationProfile /&gt;</code> — Renders the organization profile component.</li>
	<li><code>&lt;OrganizationSwitcher /&gt;</code> — Renders an organization switcher component.</li>
	<li><code>&lt;CreateOrganization /&gt;</code> — Renders UI for creating an organization.</li>
</ul>

<style>
	p {
		margin: 0.5rem auto;
	}
</style>