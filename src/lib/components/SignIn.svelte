<script lang="ts">
	import { clerk, clerkUI } from '$lib/index'
	import type { SignInProps } from '@clerk/types'
	type $$Props = SignInProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignIn', props: $$props }}
/>
