import { writable, type Writable } from 'svelte/store'
import Clerk from '@clerk/clerk-js'
import type { ClerkOptions } from '@clerk/types'

// Create a writable store for Clerk.
export const clerk: Writable<Clerk | null> = writable(null)

// This stores the Clerk instance.
let clerkInstance: Clerk | null = null

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
	if (!clerkInstance) {
		clerkInstance = new Clerk(key)

		await clerkInstance.load(options).catch((error: Error) => {
			console.error('Failed to load Clerk:', error)
		})

		clerk.set(clerkInstance)
	}
}
