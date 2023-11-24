<script lang="ts">
	import clerkUI from './clerkui.js'
	import type { OrganizationSwitcherProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'

	type $$Props = OrganizationSwitcherProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'OrganizationSwitcher', props: {...$$props }}} />
</ClerkLoaded>
