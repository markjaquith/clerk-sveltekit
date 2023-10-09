<script lang="ts">
	import { clerkUI } from '../index'
	import { clerk } from '../index'
	import type { SignInProps } from '@clerk/types'

	type $$Props = SignInProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignIn', props: $$props }}
/>
