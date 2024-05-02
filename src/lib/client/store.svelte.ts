import type Clerk from '@clerk/clerk-js'
import type ClerkHeadless from '@clerk/clerk-js/headless'

let value: Clerk | ClerkHeadless | null = $state(null)

export default function clerk() {
	return {
		get value() {
			return value
		},
		set value(newValue) {
			value = newValue
		},
	}
}
