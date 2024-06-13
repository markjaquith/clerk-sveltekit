import type { ClerkOptions, SDKMetadata, Without } from '@clerk/types'

export type ClerkInitOptions = Without<ClerkOptions, 'isSatellite'> & {
	publishableKey: string
	clerkJSUrl?: string
	clerkJSVariant?: 'headless' | ''
	clerkJSVersion?: string
	sdkMetadata?: SDKMetadata
}
