import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { withClerkHandler } from '$lib/server'

export const handle: Handle = sequence(
	withClerkHandler({
		debug: false,
		signInUrl: '/sign-in',
		signUpUrl: '/sign-up',
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
