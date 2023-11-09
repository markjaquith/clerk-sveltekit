<script lang="ts">
	import clerkUI from './clerkui.js'
	import clerk from './store.js'
	import type { UserButtonProps } from '@clerk/types'
	type $$Props = UserButtonProps
</script>

<div use:clerkUI={{ clerk: $clerk, componentType: 'UserButton', props: $$props }} />
