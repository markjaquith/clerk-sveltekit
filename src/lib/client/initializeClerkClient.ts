import type Clerk from '@clerk/clerk-js'
import type ClerkHeadless from '@clerk/clerk-js/headless'
import type { ClerkOptions } from '@clerk/types'
import type ClerkStore from './store.js'

export const DEFAULT_OPTIONS: ClerkOptions = {
	afterSignInUrl: '/',
	afterSignUpUrl: '/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
}

export default async function initializeClerkClient(
	clerk: typeof ClerkStore,
	clerkClass: typeof Clerk | typeof ClerkHeadless,
	key: string,
	options: ClerkOptions = DEFAULT_OPTIONS
): Promise<void> {
	const instance = new clerkClass(key)

	await instance.load(options).catch((error: Error) => {
		console.error('[Clerk SvelteKit] Failed to load Clerk:', error)
	})

	instance.addListener((event) => {
		if (event.user) {
			document.dispatchEvent(new CustomEvent('clerk-sveltekit:user', { detail: event.user }))
		}
	})

	clerk.set(instance)

	clerk.subscribe((clerkInstance) => {
		if (clerkInstance) window.Clerk = clerkInstance
	})
}
