<script lang="ts">
	import clerkUI from './clerkui.js'
	import type { CreateOrganizationProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'

	type $$Props = CreateOrganizationProps
</script>

<ClerkLoaded let:clerk>
	<div use:clerkUI={{ clerk, componentType: 'CreateOrganization', props: {...$$props }}} />
</ClerkLoaded>
