import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { withClerkHandler } from '$lib/server'
import { PUBLIC_CLERK_SIGN_IN_URL, PUBLIC_CLERK_SIGN_UP_URL } from '$env/static/public'

export const handle: Handle = sequence(
	withClerkHandler({
		debug: false,
		signInUrl: PUBLIC_CLERK_SIGN_IN_URL,
		signUpUrl: PUBLIC_CLERK_SIGN_UP_URL,
	}),
	({ event, resolve }) => {
		const { userId } = event.locals.auth

		if (
			(!userId && event.url.pathname.startsWith('/admin')) ||
			(!userId && event.url.pathname.includes('/protected-route'))
		) {
			return redirect(307, '/sign-in')
		}

		return resolve(event)
	}
)
