<script lang="ts">
	import UserProfile from '$lib/client/UserProfile.svelte'
	export let data
</script>

<div class="flex justify-center">
	<UserProfile />
</div>

<p class="mt-8 text-center text-gray-400"><em data-testid="server-secret">{data.secret}</em></p>
