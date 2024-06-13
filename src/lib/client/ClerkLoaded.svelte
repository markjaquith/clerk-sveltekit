<script lang="ts">
	import { isLoaded, clerk } from './store.js'
</script>

{#if $isLoaded}
	<slot clerk={$clerk} />
{/if}
