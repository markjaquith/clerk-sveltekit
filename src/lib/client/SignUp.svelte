<script lang="ts">
	import SignX from './internal/SignX.svelte'
	import type { SignUpProps } from '@clerk/types'

	type $$Props = SignUpProps
</script>

<SignX x="up" {...$$props} />
