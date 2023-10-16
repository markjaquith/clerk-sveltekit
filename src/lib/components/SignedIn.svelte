<script lang="ts">
	import { clerk } from '../index.js'
</script>

{#if $clerk?.user}
	<slot user={$clerk?.user}/>
{/if}