import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import handleClerk from '$lib/server/handleClerk'
import { CLERK_SECRET_KEY } from '$env/static/private'

export const handle: Handle = sequence(
	handleClerk({
		debug: true,
		protectedPaths: ['/admin'],
		signInUrl: '/sign-in',
		secretKey: CLERK_SECRET_KEY,
	}),
)
