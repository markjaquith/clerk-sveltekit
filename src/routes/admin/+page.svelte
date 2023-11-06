<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'

	export let data
</script>

<SignedIn let:user>
	<p>Welcome, {user?.fullName ?? 'buddy'}!</p>
	<p>You are in the admin panel.</p>
	<p>
		Since you are here, you get to know a <b>secret</b> that was loaded in a
		<code>+page.server.ts</code>
		file:
	</p>
	<p>
		<em data-testid="server-secret">{data.secret}</em>
	</p>
	<p>You can also view <a href="/admin/profile">your profile</a>.</p>
</SignedIn>

<style>
	p {
		margin: 0.5rem auto;
	}
</style>