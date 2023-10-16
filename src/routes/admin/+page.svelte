<script lang="ts">
	import { clerk } from '$lib/clerk'
	$: name = $clerk?.user?.fullName ?? 'buddy'
	
	export let data
</script>

<h2>Admin Panel</h2>

<!-- This is not wrapped with a check, because `/admin` is a protected route in the `handleClerk()` call in `hooks.server.ts -->
<p>Welcome, {name}!</p>
<p>You are in the admin panel.</p>
<p>Since you are here, you get to know a <b>secret</b> that was loaded in a <code>+page.server.ts</code> file: <em>{data.secret}</em></p>