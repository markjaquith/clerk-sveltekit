<script lang="ts">
	import { beforeUpdate } from 'svelte'
	import { goto } from '$app/navigation'
	import { clerkUI } from '../clerkui.js'
	import type { SignInProps, SignUpProps } from '@clerk/types'
	import ClerkLoaded from '../ClerkLoaded.svelte'
	import SignedOut from '../SignedOut.svelte'
	import SignedIn from '../SignedIn.svelte'
	import Redirect from './Redirect.svelte'

	export let x = 'in'
	let componentType: 'SignIn' | 'SignUp' = 'SignIn'

	$: afterSignXUrl = x === 'in' ? 'afterSignInUrl' : 'afterSignUpUrl'
	$: componentType = x === 'in' ? 'SignIn' : 'SignUp'

	type $$Props = (SignInProps | SignUpProps) & { x: 'in' | 'up'}

	const CANCEL_AFTER = 5000
	const REDIRECT_AFTER_AUTH = 'redirectAfterAuth'
	const REDIRECT_URL = 'redirectUrl'
	const EVENT_USER = 'clerk-sveltekit:user'

	$: redirectUrlFromParam = $$props.redirectUrl || $$props[afterSignXUrl] || '/'
	let clerkRedirectUrl = redirectUrlFromParam
	let showForm = false
	let timeout: ReturnType<typeof setTimeout>
	let didAuthRedirect = false

	function redirectOnceLoggedIn(url: string) {
		const callback = () => {
			if (didAuthRedirect) return
			didAuthRedirect = true
			document.removeEventListener(EVENT_USER, callback)
			clearTimeout(timeout)
			goto(url)
		}

		document.addEventListener(EVENT_USER, callback)
	}

	beforeUpdate(() => {
		const url = new URL(window.location.toString())
		redirectUrlFromParam = url.searchParams.get(REDIRECT_URL) ?? redirectUrlFromParam

		if (!showForm) {
			// Initial load, before the first render.

			// If the user arrived here with a redirectUrl, override the one passed to the component.
			const redirectUrl = url.searchParams.get(REDIRECT_URL) ?? $$props.redirectUrl

			// Determine if this is a redirect from a Clerk OAuth flow.
			if (url.searchParams.has(REDIRECT_AFTER_AUTH)) {
				// Wait for Clerk to complete the login flow, then redirect the user.
				redirectOnceLoggedIn(url.searchParams.get(REDIRECT_AFTER_AUTH) ?? '/')

				// After a while, if Clerk hasn't completed the login flow, show the login form.
				timeout = setTimeout(() => showForm = true, CANCEL_AFTER)
			} else {
				// Not a redirect from Clerk, so show the login form.
				showForm = true
			}

			// Add the redirect URL as a parameter to the current URL
			url.searchParams.delete(REDIRECT_URL)
			url.searchParams.set(REDIRECT_AFTER_AUTH, redirectUrlFromParam)
			clerkRedirectUrl = url.toString()
		}
	})
</script>

{#if showForm}
	<ClerkLoaded let:clerk>
		<SignedIn>
			<Redirect to={redirectUrlFromParam} />
		</SignedIn>
		<SignedOut>
			<div use:clerkUI={{ clerk, componentType, props: {...$$props, redirectUrl: clerkRedirectUrl, [afterSignXUrl]: null }}} />
		</SignedOut>
	</ClerkLoaded>
{/if}
