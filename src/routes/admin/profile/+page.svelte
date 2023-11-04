<script lang="ts">
	import SignedIn from '$lib/client/SignedIn.svelte'
	import UserProfile from '$lib/client/UserProfile.svelte'
	export let data
</script>

<UserProfile />

<p class="mt-8 text-center text-gray-400"><em data-testid="server-secret">{data.secret}</em></p>
