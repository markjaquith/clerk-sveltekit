<script lang="ts">
	import { clerk } from '$lib/index'
</script>

{#if $clerk}
	<slot clerk={$clerk} />
{/if}