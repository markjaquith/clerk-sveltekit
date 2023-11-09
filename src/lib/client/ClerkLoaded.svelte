<script lang="ts">
	import clerk from './store.js'
</script>

{#if $clerk}
	<slot clerk={$clerk} />
{/if}