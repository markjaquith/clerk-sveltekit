import type { Clerk, ClerkOptions, ClientResource, InitialState, Without } from '@clerk/types'
import { loadClerkJsScript, setClerkJsLoadingErrorPackageName, type LoadClerkJsScriptOptions } from '@clerk/shared/loadClerkJsScript'
import { goto } from '$app/navigation'

import { clerk, initialState, resources, isLoaded } from './store.js'

setClerkJsLoadingErrorPackageName('clerk-sveltekit');

export interface HeadlessBrowserClerk extends Clerk {
	load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>
	updateClient: (client: ClientResource) => void
}

export interface BrowserClerk extends HeadlessBrowserClerk {
	onComponentsReady: Promise<void>
	components: unknown
}

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk
		__CLERK_SK_AUTH__: InitialState
	}
}

export default async function initializeClerkClient(options: LoadClerkJsScriptOptions): Promise<void> {
	// Data comes from the Clerk middleware
	initialState.set(window.__CLERK_SK_AUTH__)

	await loadClerkJsScript({
	  ...options,
		routerPush: (url: string) => goto(url),
		routerReplace: (url: string) => goto(url, { replaceState: true }),
		signInForceRedirectUrl: '/',
		signUpForceRedirectUrl: '/',
		signInUrl: '/sign-in',
		signUpUrl: '/sign-up',
	})

	if (!window.Clerk) {
		return
	}

	await window.Clerk.load(options)

	isLoaded.set(true)
	clerk.set(window.Clerk)
	resources.set({
		client: window.Clerk.client as ClientResource,
		session: window.Clerk.session,
		user: window.Clerk.user,
		organization: window.Clerk.organization,
	})

	window.Clerk.addListener((payload) => {
		resources.set(payload)
	})
}
