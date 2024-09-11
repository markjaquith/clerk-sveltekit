<script lang="ts">
	import { useClerkContext } from './context.js'

	const { isLoaded } = useClerkContext()
</script>

{#if !$isLoaded}
	<slot />
{/if}
