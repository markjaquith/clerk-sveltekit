import { clerkSetup } from '@clerk/testing/playwright'
import { test as setup } from '@playwright/test'
import dotenv from 'dotenv'

setup('global setup', async () => {
	dotenv.config()

	if (
		!process.env.PUBLIC_CLERK_PUBLISHABLE_KEY ||
		!process.env.E2E_CLERK_USER_USERNAME ||
		!process.env.E2E_CLERK_USER_PASSWORD
	) {
		throw new Error(
			'Please provide PUBLIC_CLERK_PUBLISHABLE_KEY, E2E_CLERK_USER_USERNAME, and E2E_CLERK_USER_PASSWORD environment variables.'
		)
	}

	await clerkSetup({
		publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
	})
})
