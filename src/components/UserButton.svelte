<script lang="ts">
	import { clerkUI } from '../../index'
	import { clerk } from '../../index'
	import type { UserButtonProps } from '@clerk/types'

	type $$Props = UserButtonProps
</script>

<div use:clerkUI={{ clerk: $clerk, componentType: 'UserButton', props: $$props }} />
