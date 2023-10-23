import { createClerkClient } from '@clerk/clerk-sdk-node'
import { json } from '@sveltejs/kit'
import type { RequestHandler, RequestEvent } from '@sveltejs/kit'

let clerk: ReturnType<typeof createClerkClient> | null = null

export function createClient(secretKey: string) {
	clerk = createClerkClient({ secretKey })
}

export const verifySession = async (sessionToken: string) => {
	if (!clerk) {
		throw new Error('Clerk client not initialized')
	}

	if (sessionToken) {
		const claims = await clerk.verifyToken(sessionToken)
		return {
			userId: claims.sub,
			claims,
		}
	}
}

export const requireSession = (handler: RequestHandler) => async (event: RequestEvent) => {
	if (!event.locals.session) {
		return json({ ok: false, error: 'Users Session not found' })
	}
	return handler(event)
}
