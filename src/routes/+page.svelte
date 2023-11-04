<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'
	import SignedOut from '$lib/client/SignedOut.svelte'
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
		<ul>
			<li><a href="/sign-in">Sign in</a></li>
			<li><a href="/sign-up">Sign up</a></li>
		</ul>
	</Box>
</SignedOut>

<p><b>clerk-sveltekit</b> offers server-based route protection, login flow, and the following Svelte components:</p>

<ul class="[&_code]:bg-yellow-50 [&_code]:p-1 [&_code]:font-bold list-disc list-outside pl-6 pt-8">
	<li><code>&lt;ClerkLoading /&gt;</code> — Wrapper that shows its contents when Clerk is still loading.</li>
	<li><code>&lt;ClerkLoaded let:clerk /&gt;</code> — Wrapper that shows its contents (and exposes the <code>clerk</code> object) when Clerk is done loading.</li>
	<li><code>&lt;SignIn /&gt;</code> — Renders a sign-in form.</li>
	<li><code>&lt;SignUp /&gt;</code> — Renders a sign-up form.</li>
	<li><code>&lt;SignedIn let:user /&gt;</code> — Wrapper that shows its contents (and exposes the Clerk <code>user</code> object) when the user is signed in.</li>
	<li><code>&lt;SignedOut /&gt;</code> — Wrapper that shows its contents when the user is not signed in.</li>
	<li><code>&lt;UserButton /&gt;</code> — Button that shows the user’s profile photo with log out link when they are signed in.</li>
</ul>

<style>
	p {
		margin: 0.5rem auto;
	}
</style>