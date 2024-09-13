<script lang="ts">
	import type { SignInProps } from '@clerk/types';
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { useClerkContext } from './context.js'

	export let forceRedirectUrl: string | undefined = undefined
	export let fallbackRedirectUrl: string | undefined = undefined
	export let signUpFallbackRedirectUrl: string | undefined = undefined
	export let signUpForceRedirectUrl: string | undefined = undefined
	export let mode: "redirect" | "modal" | undefined = undefined

    type $$Props = SignInProps & HTMLButtonAttributes & {
  		mode?: "redirect" | "modal" | undefined
    }

    const { clerk } = useClerkContext()

	function signIn() {
		const opts: SignInProps = {
    		forceRedirectUrl,
    		fallbackRedirectUrl,
    		signUpFallbackRedirectUrl,
    		signUpForceRedirectUrl
		}

		if (mode === 'modal') {
			return $clerk?.openSignIn(opts)
		}
		return $clerk?.redirectToSignIn({
		  ...opts,
			signInFallbackRedirectUrl: fallbackRedirectUrl,
            signInForceRedirectUrl: forceRedirectUrl,
		})
	}
</script>

<button type="button" on:click={signIn} {...$$restProps}><slot>Sign In</slot></button>
