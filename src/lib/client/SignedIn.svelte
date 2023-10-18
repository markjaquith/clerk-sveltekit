<script lang="ts">
	import ClerkLoaded from './ClerkLoaded.svelte'
</script>

<ClerkLoaded let:clerk>
	{#if clerk && clerk.user}
		<slot user={clerk.user} />
	{/if}
</ClerkLoaded>