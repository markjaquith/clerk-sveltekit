import type { Handle, RequestEvent } from '@sveltejs/kit'
import { verifySession } from './index.js'

type ClerkErrorWithReason = {
	reason?: string
	[key: string]: unknown
}

type ProtectedPath =
	| string
	| ((event: RequestEvent<Partial<Record<string, string>>, string | null>) => boolean)

export default function handleClerk(
	secretKey: string,
	{
		debug = false,
		protectedPaths = [],
		signInUrl = '/sign-in',
	}: {
		debug?: boolean
		protectedPaths?: ProtectedPath[]
		signInUrl?: string
	}
) {
	return (async ({ event, resolve }) => {
		const sessionToken = event.cookies.get('__session')

		debug && console.log('[Clerk SvelteKit] ' + event.url.pathname)

		if (sessionToken) {
			debug && console.log('[Clerk SvelteKit] Found session token in cookies.')
			try {
				const session = await verifySession(secretKey, sessionToken)
				if (session) {
					debug && console.log('[Clerk SvelteKit] Session verified successfully.')
					event.locals.session = session
				} else {
					debug && console.warn('[Clerk SvelteKit] Session verification returned no session.')
				}
			} catch (error) {
				debug &&
					console.log(
						'[Clerk SvelteKit] Session verification failed.',
						(error as ClerkErrorWithReason)?.reason ?? error
					)
			}
		} else {
			debug && console.log('[Clerk SvelteKit] No session token found in cookies.')
		}

		// Protect the protected routes.
		if (
			!event.locals.session &&
			protectedPaths.find((path) =>
				typeof path === 'string' ? event.url.pathname.startsWith(path) : path(event)
			)
		) {
			debug && console.log('[Clerk SvelteKit] No session found, redirecting to login screen.')
			const fullSignInUrl = new URL(signInUrl, event.url.origin)
			return Response.redirect(fullSignInUrl.toString() + '?redirectUrl=' + event.url.pathname)
		}

		return resolve(event)
	}) satisfies Handle
}
