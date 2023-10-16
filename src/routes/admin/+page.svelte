<script lang="ts">
	import { SignedIn } from '$lib/index'
	export let data
</script>

<h2>Admin Panel</h2>

<SignedIn let:user>
	<p>Welcome, {user?.fullName}!</p>
	<p>You are in the admin panel.</p>
	<p>
		Since you are here, you get to know a <b>secret</b> that was loaded in a
		<code>+page.server.ts</code>
		file: <em>{data.secret}</em>
	</p>
</SignedIn>
