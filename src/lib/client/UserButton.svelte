<script lang="ts">
	import ClerkLoaded from './ClerkLoaded.svelte'
	import clerkUI from './clerkui.js'
	import type { UserButtonProps } from '@clerk/types'

	type $$Props = UserButtonProps
</script>

<ClerkLoaded let:clerk>
    <div use:clerkUI={{ clerk, componentType: 'UserButton', props: $$props }}></div>
</ClerkLoaded>
