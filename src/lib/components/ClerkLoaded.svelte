<script lang="ts">
	import { clerk } from '$lib/index.js'
</script>

{#if $clerk}
	<slot clerk={$clerk} />
{/if}