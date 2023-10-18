<script lang="ts">
	import { clerk, clerkUI } from './index.js'
	import type { SignUpProps } from '@clerk/types'
	type $$Props = SignUpProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignUp', props: $$props }}
/>
