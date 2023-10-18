<script lang="ts">
	import { clerk } from './index.js'
</script>

{#if !$clerk}
	<slot />
{/if}