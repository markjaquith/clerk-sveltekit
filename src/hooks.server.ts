import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import handleClerk from '$lib/server/handleClerk'

export const handle: Handle = sequence(
	handleClerk({
		debug: true,
		protectedPaths: ['/playground', '/insert', '/admin', '/create'],
		signInUrl: '/sign-in',
	})
)
