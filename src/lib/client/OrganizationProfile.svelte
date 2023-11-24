<script lang="ts">
	import clerkUI from './clerkui.js'
	import type { OrganizationProfileProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'

	type $$Props = OrganizationProfileProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'OrganizationProfile', props: {...$$props }}} />
</ClerkLoaded>
