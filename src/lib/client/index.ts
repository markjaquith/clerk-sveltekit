import { writable, type Writable } from 'svelte/store'
import Clerk from '@clerk/clerk-js'
import type { ClerkOptions } from '@clerk/types'
import ClerkLoaded from './ClerkLoaded.svelte'
import ClerkLoading from './ClerkLoading.svelte'
import SignedIn from './SignedIn.svelte'
import SignedOut from './SignedOut.svelte'
import SignIn from './SignIn.svelte'
import SignUp from './SignUp.svelte'
import UserButton from './UserButton.svelte'

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
	console.log('[ClerkSvelteKit] Initializing Clerk client...')
	const instance = new Clerk(key)

	await instance.load(options).catch((error: Error) => {
		console.error('[Clerk SvelteKit] Failed to load Clerk:', error)
	})

	clerk.set(instance)
}

export { clerkUI } from './clerkui.js'
export { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignIn, SignUp, UserButton }
