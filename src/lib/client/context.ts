import type {
	ActiveSessionResource,
	ActJWTClaim,
	ClientResource,
	OrganizationCustomPermissionKey,
	OrganizationCustomRoleKey,
	OrganizationResource,
	UserResource,
} from '@clerk/types'
import type { HeadlessBrowserClerk, BrowserClerk } from './types.js'
import { getContext, setContext } from 'svelte'
import type { Readable, Writable } from 'svelte/store'

const _contextKey = '$$_clerk'

interface ClerkContext {
	clerk: Writable<HeadlessBrowserClerk | BrowserClerk | null>
	isLoaded: Writable<boolean>
	auth: Readable<{
		userId: string | null | undefined
		sessionId: string | null | undefined
		actor: ActJWTClaim | null | undefined
		orgId: string | null | undefined
		orgRole: OrganizationCustomRoleKey | null | undefined
		orgSlug: string | null | undefined
		orgPermissions: OrganizationCustomPermissionKey[] | null | undefined
	}>
	client: Readable<ClientResource | null | undefined>
	session: Readable<ActiveSessionResource | null | undefined>
	user: Readable<UserResource | null | undefined>
	organization: Readable<OrganizationResource | null | undefined>
}

export const useClerkContext = (): ClerkContext => {
	const client = getContext<ClerkContext>(_contextKey)
	if (!client) {
		throw new Error(
			'No Clerk data was found in Svelte context. Did you forget to wrap your component with ClerkProvider?'
		)
	}

	return client
}

export const setClerkContext = (context: ClerkContext): void => {
	setContext(_contextKey, context)
}
