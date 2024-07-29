<script lang="ts">
	import { isLoaded } from './store.js'
</script>

{#if !$isLoaded}
	<slot />
{/if}
