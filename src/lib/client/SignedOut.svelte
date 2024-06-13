<script lang="ts">
	import { auth } from '$lib/client/store.js'
</script>

{#if $auth?.userId === null}
	<slot />
{/if}
