<script lang="ts">
	import type { SignUpProps } from '@clerk/types';
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { useClerkContext } from './context.js'

	export let fallbackRedirectUrl: string | undefined = undefined
	export let forceRedirectUrl: string | undefined = undefined
	export let signInFallbackRedirectUrl: string | undefined = undefined
	export let signInForceRedirectUrl: string | undefined = undefined
	export let unsafeMetadata: SignUpProps['unsafeMetadata'] = undefined
	export let mode: "redirect" | "modal" | undefined = undefined

    type $$Props = SignUpProps & HTMLButtonAttributes & {
  		mode?: "redirect" | "modal" | undefined
    }

    const { clerk } = useClerkContext();

	function signUp() {
   	    const opts: SignUpProps = {
          fallbackRedirectUrl,
          forceRedirectUrl,
          signInFallbackRedirectUrl,
          signInForceRedirectUrl,
          unsafeMetadata,
        };
		if (mode === 'modal') {
			return $clerk?.openSignUp(opts)
		}
		return $clerk?.redirectToSignUp({
		  ...opts,
    	   signUpFallbackRedirectUrl: fallbackRedirectUrl,
           signUpForceRedirectUrl: forceRedirectUrl,
		})
	}
</script>

<button type="button" on:click={signUp} {...$$restProps}><slot>Sign Up</slot></button>
