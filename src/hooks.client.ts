import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { initializeClerkClient } from './lib/client/index.js'

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
})
