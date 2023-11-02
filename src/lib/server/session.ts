
import { verifyToken } from '@clerk/backend'

export const verifySession = async (secretKey: string, sessionToken: string) => {
	if (sessionToken) {
		const issuer = (issuer: string) => issuer.startsWith('https://clerk.') || issuer.includes('.clerk.accounts')
		const claims = await verifyToken(sessionToken, {
			secretKey,
			issuer,
		})
		return {
			userId: claims.sub,
			claims,
		}
	}
}
