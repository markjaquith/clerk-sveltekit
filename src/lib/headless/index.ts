import Clerk from '@clerk/clerk-js/headless'
import clerk from '../client/store.js'
import _initializeClerkClient, { DEFAULT_OPTIONS } from '../client/initializeClerkClient.js'

type Params = Parameters<typeof _initializeClerkClient>

export async function initializeClerkClient(
	key: Params[2],
	options: Params[3] = DEFAULT_OPTIONS
): Promise<void> {
	return _initializeClerkClient(clerk, Clerk, key, options)
}

export { clerkUI } from '../client/clerkui.js'
