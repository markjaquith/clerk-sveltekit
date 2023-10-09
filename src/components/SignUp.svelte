<script lang="ts">
	import { clerkUI } from '../index'
	import { clerk } from '../index'
	import type { SignUpProps } from '@clerk/type'

	type $$Props = SignUpProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignUp', props: $$props }}
/>
