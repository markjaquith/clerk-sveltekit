<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'
	import SignedOut from '$lib/client/SignedOut.svelte'
</script>

<h2>Clerk SvelteKit</h2>

<SignedIn let:user>
	<div class="box">
		<p>Welcome, {user?.fullName ?? 'buddy'}!</p>
		<p>Since you are signed in, you should be able to access the <a href="/admin">admin panel</a></p>
	</div>
</SignedIn>

<p><b>clerk-sveltekit</b> is a JavaScript package that integrates <a href="https://clerk.com/">Clerk</a> authentication into a <a href="https://kit.svelte.dev/">SvelteKit</a> site. This demo site is included in <a href="https://github.com/markjaquith/clerk-sveltekit">the repo</a> as an example and for end-to-end testing the package.</p>
<p>You are not signed in.</p>

<SignedOut>
	<div class="box">
		<p>
			You should not be able to go to the <a href="/admin">admin panel</a> without signing in, because
			it is defined as a protected route in <code>hooks.server.ts</code> — go ahead and try!
		</p>
		<ul>
			<li><a href="/sign-in">Sign in</a></li>
			<li><a href="/sign-up">Sign up</a></li>
		</ul>
	</div>
</SignedOut>

<p><b>clerk-sveltekit</b> offers server-based route protection, login flow, and the following Svelte components:</p>

<ul>
	<li><code>&lt;ClerkLoading /&gt;</code> — Wrapper that shows its contents when Clerk is still loading.</li>
	<li><code>&lt;ClerkLoaded let:clerk /&gt;</code> — Wrapper that shows its contents (and exposes the <code>clerk</code> object) when Clerk is done loading.</li>
	<li><code>&lt;SignIn /&gt;</code> — Renders a sign-in form.</li>
	<li><code>&lt;SignUp /&gt;</code> — Renders a sign-up form.</li>
	<li><code>&lt;SignedIn let:user /&gt;</code> — Wrapper that shows its contents (and exposes the Clerk <code>user</code> object) when the user is signed in.</li>
	<li><code>&lt;SignedOut /&gt;</code> — Wrapper that shows its contents when the user is not signed in.</li>
	<li><code>&lt;UserButton /&gt;</code> — Button that shows the user’s profile photo with log out link when they are signed in.</li>
</ul>


<style>
	.box {
		padding: 1rem;
		background: rgba(255,255,255,0.7);
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	code {
		background: lightgoldenrodyellow;
		color: black;
		padding: 0.25rem;
		font-weight: bold;
	}
</style>
