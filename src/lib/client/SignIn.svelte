<script lang="ts">
	import SignX from './SignX.svelte'
	import type { SignInProps } from '@clerk/types'

	type $$Props = SignInProps
</script>

<SignX x="in" {...$$props} />
