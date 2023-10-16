<script lang="ts">
	import { clerk } from '../index.js'
</script>

{#if $clerk && !$clerk.user}
	<slot />
{/if}