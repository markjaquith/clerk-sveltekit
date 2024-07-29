import type { HandleClientError } from '@sveltejs/kit'
import { initializeClerkClient } from './lib/client/index.js'

import {
	PUBLIC_CLERK_PUBLISHABLE_KEY,
	PUBLIC_CLERK_SIGN_IN_URL,
	PUBLIC_CLERK_SIGN_UP_URL,
} from '$env/static/public'

initializeClerkClient({
	publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY,
	signInForceRedirectUrl: '/admin',
	signUpForceRedirectUrl: '/admin',
	signInUrl: PUBLIC_CLERK_SIGN_IN_URL,
	signUpUrl: PUBLIC_CLERK_SIGN_UP_URL
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
