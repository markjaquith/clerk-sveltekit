import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import handleClerk from '$lib/server/handleClerk'
import { CLERK_SECRET_KEY } from '$env/static/private'

export const handle: Handle = sequence(
	handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/admin', ({ url }) => new URL(url).pathname.includes('protected-route')],
		signInUrl: '/sign-in',
	})
)
