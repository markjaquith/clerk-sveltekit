<script lang="ts">
	import { clerk } from '$lib/client/clerk.js'
	import { clerkUI } from '$lib/index.js'
	import type { SignUpProps } from '@clerk/types'
	type $$Props = SignUpProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignUp', props: $$props }}
/>
