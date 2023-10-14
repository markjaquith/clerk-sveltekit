<script lang="ts">
	import { clerkUI } from '../index.js';
	import { clerk } from '../index.js';
	import type { UserButtonProps } from '@clerk/types';

	type $$Props = UserButtonProps;
</script>

<div use:clerkUI={{ clerk: $clerk, componentType: 'UserButton', props: $$props }} />
