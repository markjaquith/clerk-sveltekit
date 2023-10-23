<script lang="ts">
	import { beforeUpdate } from 'svelte'
	import { goto } from '$app/navigation'
	import { clerkUI } from './index.js'
	import type { SignUpProps } from '@clerk/types'
	import ClerkLoaded from './ClerkLoaded.svelte'
	type $$Props = SignUpProps

	const RETRY_EVERY = 100
	const CANCEL_AFTER = 5000

	let afterSignUpUrl = $$props.afterSignUpUrl || '/'
	let showForm = false
	let timeout: ReturnType<typeof setTimeout>

	function redirectOnceLoggedIn(url: string) {
		if (document.cookie.includes('__session=')) {
			goto(url)
		} else {
			timeout = setTimeout(() => redirectOnceLoggedIn(url), RETRY_EVERY)
		}
	}

	beforeUpdate(() => {
		if (!showForm) {
			const url = new URL(window.location.toString())
			if (url.searchParams.has('afterSignUpUrl')) {
				redirectOnceLoggedIn(url.searchParams.get('afterSignUpUrl') ?? '/')
				setTimeout(() => {
					clearTimeout(timeout)
					showForm = true
				}, CANCEL_AFTER)
			} else {
				showForm = true
			}

			url.searchParams.set('afterSignUpUrl', afterSignUpUrl)
			afterSignUpUrl = url.toString()
		}
	})
</script>

{#if showForm}
	<ClerkLoaded let:clerk>
		<div use:clerkUI={{ clerk, componentType: 'SignUp', props: {...$$props, afterSignUpUrl }}} />
	</ClerkLoaded>
{/if}