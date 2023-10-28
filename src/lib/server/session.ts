import { CLERK_SECRET_KEY } from '$env/static/private'
import { Clerk, verifyToken } from '@clerk/backend'
import { json } from '@sveltejs/kit'
import type { RequestHandler, RequestEvent } from '@sveltejs/kit'

let clerk: ReturnType<typeof Clerk> | null = null

export function createClient(secretKey: string) {
	clerk = Clerk({ secretKey })
}

export const verifySession = async (sessionToken: string) => {
	if (!clerk) {
		throw new Error('Clerk client not initialized')
	}

	if (sessionToken) {
		const issuer = (iss: string) => iss.startsWith('https://clerk.') || iss.includes('.clerk.accounts')
		const claims = await verifyToken(sessionToken, {
			secretKey: CLERK_SECRET_KEY,
			issuer,
		})
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
