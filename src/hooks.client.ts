import type { HandleClientError } from '@sveltejs/kit'
import { initializeClerkClient } from './lib/client/index.js'

import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'

initializeClerkClient({
	publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY,
	signInForceRedirectUrl: '/admin',
	signUpForceRedirectUrl: '/admin',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
