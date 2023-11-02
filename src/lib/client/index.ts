import { writable, type Writable } from 'svelte/store'
import Clerk from '@clerk/clerk-js'
import type { ClerkOptions } from '@clerk/types'

// Create a writable store for Clerk.
export const clerk: Writable<Clerk | null> = writable(null)

const DEFAULT_OPTIONS: ClerkOptions = {
	afterSignInUrl: '/',
	afterSignUpUrl: '/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
}

export async function initializeClerkClient(
	key: string,
	options: ClerkOptions = DEFAULT_OPTIONS,
): Promise<void> {
	const instance = new Clerk(key)

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

export { clerkUI } from './clerkui.js'