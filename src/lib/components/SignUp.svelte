<script lang="ts">
	import { clerk, clerkUI } from '$lib/index'
	import type { SignUpProps } from '@clerk/types'
	type $$Props = SignUpProps
</script>

<div
	class:loading={!$clerk}
	use:clerkUI={{ clerk: $clerk, componentType: 'SignUp', props: $$props }}
/>
