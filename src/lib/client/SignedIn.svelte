<script lang="ts">
	import { useClerkContext } from './context.js'

	const { auth } = useClerkContext()
</script>

{#if $auth?.userId}
	<slot />
{/if}
