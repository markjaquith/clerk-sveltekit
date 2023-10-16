import { writable, type Writable } from 'svelte/store'
import Clerk from '@clerk/clerk-js'

// Create a writable store for Clerk.
export const clerk: Writable<Clerk | null> = writable(null)

// This stores the Clerk instance.
let clerkInstance: Clerk | null = null

export async function initializeClerk(key: string): Promise<void> {
	if (!clerkInstance && typeof window !== 'undefined') {
		clerkInstance = new Clerk(key)

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
