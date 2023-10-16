import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import handleClerk from '$lib/server/handleClerk'

export const handle: Handle = sequence(
	handleClerk({
		debug: true,
		protectedPaths: ['/admin'],
		signInUrl: '/sign-in',
	}),
)
