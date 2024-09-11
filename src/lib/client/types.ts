import type { Clerk as ClerkMain, ClerkOptions, ClientResource, Without } from '@clerk/types'

export interface HeadlessBrowserClerk extends ClerkMain {
	load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>
	updateClient: (client: ClientResource) => void
}

export interface BrowserClerk extends HeadlessBrowserClerk {
	onComponentsReady: Promise<void>
	components: unknown
}

export type Clerk = HeadlessBrowserClerk | BrowserClerk;

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk
	}
}
