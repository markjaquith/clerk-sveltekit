<script lang="ts">
	import { clerk, clerkUI } from '$lib/index'
	import type { UserButtonProps } from '@clerk/types'
	type $$Props = UserButtonProps
</script>

<div use:clerkUI={{ clerk: $clerk, componentType: 'UserButton', props: $$props }} />
