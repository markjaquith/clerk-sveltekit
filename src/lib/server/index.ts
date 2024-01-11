import type { verifySession } from './session.js'

export { default as handleClerk } from './handleClerk.js'
export * from './session.js'

declare global {
	namespace App {
		interface Locals {
			session: Awaited<ReturnType<typeof verifySession>>
		}
	}
}
