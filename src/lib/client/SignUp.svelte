<script lang="ts">
	import clerkUI from './clerkui.js'
	import type { SignUpProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'

	type $$Props = SignUpProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'SignUp', props: {...$$props }}}></div>
</ClerkLoaded>
