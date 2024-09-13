<script lang="ts">
	import { useClerkContext } from './context.js'

	const { isLoaded, clerk } = useClerkContext()
</script>

{#if $isLoaded}
	<slot clerk={$clerk} />
{/if}
