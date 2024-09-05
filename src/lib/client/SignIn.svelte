<script lang="ts">
	import clerkUI from './clerkui.js'
	import type { SignInProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'

	type $$Props = SignInProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'SignIn', props: {...$$props }}}></div>
</ClerkLoaded>
