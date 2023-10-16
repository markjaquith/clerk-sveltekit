<script lang="ts">
	import { ClerkLoaded } from '$lib/index'
</script>

<ClerkLoaded let:clerk>
	{#if clerk && clerk.user}
		<slot user={clerk.user} />
	{/if}
</ClerkLoaded>