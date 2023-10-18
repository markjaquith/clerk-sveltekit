<script lang="ts">
	import { clerk } from '$lib/client/clerk.js'
</script>

{#if $clerk}
	<slot clerk={$clerk} />
{/if}