<script lang="ts">
import {
	loadClerkJsScript,
	setClerkJsLoadingErrorPackageName,
	type LoadClerkJsScriptOptions,
} from '@clerk/shared/loadClerkJsScript'
import { goto } from '$app/navigation'

import { onMount } from 'svelte'
import { isTruthy } from '@clerk/shared'
import { env as publicEnv } from '$env/dynamic/public';
import { derived, writable, type Writable } from 'svelte/store'
import type { ClientResource, InitialState, Resources, Without } from '@clerk/types'
import type { BrowserClerk, HeadlessBrowserClerk } from './types.js'
import { deriveState } from '@clerk/shared/deriveState'
import { setClerkContext } from './context.js'

type $$Props = Without<LoadClerkJsScriptOptions, 'routerPush' | 'routerReplace'> & {
  initialState?: InitialState
}

const clerk: Writable<HeadlessBrowserClerk | BrowserClerk | null> = writable(null)
const isLoaded: Writable<boolean> = writable(false)
const resources: Writable<Resources> = writable({
	client: {} as ClientResource,
	session: undefined,
	user: undefined,
	organization: undefined,
})
const auth = derived(
	[resources, isLoaded],
	([$resources, $isLoaded]) => {
		return deriveState($isLoaded, $resources, $$props.initialState)
	}
)
const client = derived(resources, ($v) => $v.client)
const session = derived(auth, ($v) => $v.session)
const user = derived(auth, ($v) => $v.user)
const organization = derived(auth, ($v) => $v.organization)

async function loadClerk() {
  const options = {
	...$$props,
	telemetry: $$props.telemetry || {
		disabled: isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DISABLED),
		debug: isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DEBUG)
	},
	routerPush: (url: string) => goto(url),
	routerReplace: (url: string) => goto(url, { replaceState: true })
  } as LoadClerkJsScriptOptions

  await loadClerkJsScript(options)

  await window.Clerk.load(options)

  isLoaded.set(true)
  clerk.set(window.Clerk)

  window.Clerk.addListener((payload) => {
	resources.set(payload)
  })
}

setClerkJsLoadingErrorPackageName('clerk-sveltekit');

onMount(() => {
  loadClerk()
})

setClerkContext({
  clerk,
  isLoaded,
  auth,
  client,
  session,
  user,
  organization,
})
</script>

<slot />
