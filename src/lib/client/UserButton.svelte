<script lang="ts">
	import { clerk } from '$lib/client/clerk.js'
	import { clerkUI } from '$lib/index.js'
	import type { UserButtonProps } from '@clerk/types'
	type $$Props = UserButtonProps
</script>

<div use:clerkUI={{ clerk: $clerk, componentType: 'UserButton', props: $$props }} />
