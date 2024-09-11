<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { SignOutOptions } from '@clerk/types';
	import { useClerkContext } from './context.js'

	export let sessionId: string | undefined = undefined
	export let redirectUrl: string | undefined = '/'

    type $$Props = SignOutOptions & HTMLButtonAttributes

    const { clerk } = useClerkContext()

	function signOut() {
		return $clerk?.signOut({ sessionId, redirectUrl })
	}
</script>

<button type="button" on:click={signOut} {...$$restProps}><slot>Sign Out</slot></button>
