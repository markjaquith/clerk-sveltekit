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
	console.log('Initializing Clerk client...')
	const clerkInstance = new Clerk(key)

	await clerkInstance.load(options).catch((error: Error) => {
		console.error('Failed to load Clerk:', error)
	})

	clerk.set(clerkInstance)
}
