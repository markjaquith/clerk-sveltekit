import type { LayoutLoad } from './$types'
import { createKitDocsLoader } from '@svelteness/kit-docs'

// export const prerender = true

export const load = createKitDocsLoader({
	sidebar: {
		'/': null,
		'/docs': '/docs',
	},
}) satisfies LayoutLoad
