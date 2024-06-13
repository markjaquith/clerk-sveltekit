<script lang="ts">
	import { clerk } from '../client/store.js'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { SignOutOptions } from '@clerk/types';

	export let sessionId: string | undefined = undefined
	export let redirectUrl: string | undefined = '/'

    type $$Props = SignOutOptions & HTMLButtonAttributes

	function signOut() {
		return $clerk?.signOut({ sessionId, redirectUrl })
	}
</script>

<button type="button" on:click={signOut} {...$$restProps}><slot>Sign Out</slot></button>
