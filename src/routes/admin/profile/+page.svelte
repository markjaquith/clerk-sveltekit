<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'
	export let data
</script>

<h2>Admin Panel — User Profile</h2>

<SignedIn let:user>
	<p>
		This is your user profile.
	</p>
	<p><b>First Name:</b> <code>{user?.firstName}</code></p>
	<p><b>Last Name:</b> <code>{user?.lastName}</code></p>
	<p><b>Email:</b> <code>{user?.emailAddresses[0] ?? ''}</code></p>

	<footer><em data-testid="server-secret">{data.secret}</em></footer>
</SignedIn>