import { derived, writable, type Writable } from 'svelte/store'
import type { ClientResource, InitialState, Resources } from '@clerk/types'
import type { BrowserClerk, HeadlessBrowserClerk } from './initializeClerkClient'
import { deriveState } from '@clerk/shared/deriveState'

export const clerk: Writable<HeadlessBrowserClerk | BrowserClerk | null> = writable(null)

export const isLoaded: Writable<boolean> = writable(false)

/**
 * @internal
 */
export const initialState: Writable<InitialState> = writable()

/**
 * @internal
 */
export const resources: Writable<Resources> = writable({
	client: {} as ClientResource,
	session: undefined,
	user: undefined,
	organization: undefined,
})

/**
 * A store that is prepopulated with the authentication context during SSR.
 *
 * @example
 * A simple example:
 *
 * auth.subscribe((auth) => console.log(auth.userId))
 */
export const auth = derived(
	[resources, isLoaded, initialState],
	([$resources, $isLoaded, $initialState]) => {
		return deriveState($isLoaded, $resources, $initialState)
	}
)

/**
 * A store that is populated after clerk-js has loaded.
 * The store returns the clerk client or `null`.
 *
 * @example
 * A simple example:
 *
 * $: console.log('active session', $client?.activeSessions)
 */
export const client = derived(resources, ($v) => $v.client)

/**
 * A store that is populated after clerk-js has loaded.
 * The store returns the session of the authenticated user or `null`.
 *
 * @example
 * A simple example:
 *
 * $: console.log('session id', $session?.id)
 */
export const session = derived(auth, ($v) => $v.session)

/**
 * A store that is populated after clerk-js has loaded.
 * The store returns back the authenticated user or `null`.
 *
 * @example
 * $: console.log('user id', $user?.id)
 */
export const user = derived(auth, ($v) => $v.user)

/**
 * A store that is populated after clerk-js has loaded.
 * The store returns the active organization of the authenticated user or `null`.
 *
 * @example
 * $: console.log('organization id', $organization?.id)
 */
export const organization = derived(auth, ($v) => $v.organization)
