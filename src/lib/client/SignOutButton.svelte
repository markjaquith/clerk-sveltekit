<script lang="ts">
	import clerk from '../client/store.js'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	export let signOutCallback: (() => void) | undefined = undefined
	export let signOutOptions: Record<string, unknown> | undefined = undefined

  interface $$Props extends HTMLButtonAttributes {
		signOutCallback?: (() => void) | undefined
		signOutOptions?: Record<string, unknown> | undefined
  }
	
	function signOut() {
		return $clerk?.signOut(signOutCallback, signOutOptions)
	}
</script>

<button type="button" on:click={signOut} {...$$restProps}><slot>Sign Out</slot></button>