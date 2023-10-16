import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { writable, type Writable } from 'svelte/store'
import { browser } from '$app/environment'
import Clerk from '@clerk/clerk-js'

// Create a writable store for Clerk.
export const clerk: Writable<Clerk | null> = writable(null)

// This stores the Clerk instance.
let clerkInstance: Clerk | null = null

export async function initializeClerk(): Promise<void> {
	if (!clerkInstance && browser) {
		clerkInstance = new Clerk(PUBLIC_CLERK_PUBLISHABLE_KEY)

		await clerkInstance
			.load({
				afterSignInUrl: '/', // TODO: configurable
				afterSignUpUrl: '/', // TODO: configurable
				signInUrl: '/sign-in', // TODO: configurable
				signUpUrl: '/sign-up', // TODO: configurable
			})
			.catch((error: Error) => {
				console.error('Failed to load Clerk:', error)
			})

		clerk.set(clerkInstance)
	}
}

// Initialize Clerk (should only run in the browser, once).
initializeClerk()
