<script lang="ts">
	import { clerk } from '$lib/client/clerk.js'
	import { clerkUI } from '$lib/index.js'
	import type { SignInProps } from '@clerk/types'
	type $$Props = SignInProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignIn', props: $$props }}
/>
