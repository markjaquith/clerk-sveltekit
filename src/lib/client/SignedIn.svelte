<script lang="ts">
	import ClerkLoaded from '$lib/client/ClerkLoaded.svelte'
</script>

<ClerkLoaded let:clerk>
	{#if clerk && clerk.user}
		<slot user={clerk.user} />
	{/if}
</ClerkLoaded>