<script lang="ts">
	import { clerkUI } from '../index.js'
	import type { UserProfileProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'
	import SignedIn from './SignedIn.svelte'

	type $$Props = UserProfileProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'UserProfile', props: {...$$props }}} />
</ClerkLoaded>
