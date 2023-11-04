<script lang="ts">
	import type { ComponentType } from "svelte"
	export let inside: ComponentType
	export let when: boolean
</script>

{#if when}
	<svelte:component this={inside}>
		<slot />
	</svelte:component>
{:else}
	<slot />
{/if}