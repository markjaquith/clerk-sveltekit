<script lang="ts">
	import { SignedIn, SignedOut, clerk } from '$lib/index'
</script>

<h2>Front Page</h2>

<SignedIn>
	<p>Welcome, {$clerk?.user?.fullName}!</p>
	<p>Since you are signed in, you should be able to access the <a href="/admin">admin panel</a></p>
</SignedIn>
<SignedOut>
	<p>You are not signed in.</p>
	<p>
		You should not be able to go to the <a href="/admin">admin panel</a> without signing in, because
		it is defined as a protected route in <code>hooks.server.ts</code> — go ahead and try!
	</p>
	<ul>
		<li><a href="/sign-in">Sign in</a></li>
		<li><a href="/sign-up">Sign up</a></li>
	</ul>
</SignedOut>
