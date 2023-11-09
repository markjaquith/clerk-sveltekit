<script lang="ts">
	import clerk from '../client/store.js'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	export let afterSignInUrl: string | undefined = undefined
	export let afterSignUpUrl: string | undefined = undefined 
	export let redirectUrl: string | undefined = undefined 
	export let mode: "redirect" | "modal" | undefined = undefined

  interface $$Props extends HTMLButtonAttributes {
		afterSignInUrl?: string | undefined
		afterSignUpUrl?: string | undefined
		redirectUrl?: string | undefined
		mode?: "redirect" | "modal" | undefined
  }
	
	function signIn() {
		const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl }
		if (mode === 'modal') {
			return $clerk?.openSignIn(opts)
		}
		return $clerk?.redirectToSignIn(opts)
	}
</script>

<button type="button" on:click={signIn} {...$$restProps}><slot>Sign In</slot></button>