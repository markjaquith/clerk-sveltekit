<script lang="ts">
	import { ClerkLoaded } from '$lib/index.js'
</script>

<ClerkLoaded let:clerk>
	{#if clerk && !clerk.user}
		<slot />
	{/if}
</ClerkLoaded>