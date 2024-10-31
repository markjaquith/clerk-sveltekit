import { clerkSetup } from '@clerk/testing/playwright'
import { test as setup } from '@playwright/test'
import dotenv from 'dotenv'

setup('global setup', async () => {
	dotenv.config()

	if (!process.env.PUBLIC_CLERK_PUBLISHABLE_KEY) {
		throw new Error('Please provide the PUBLIC_CLERK_PUBLISHABLE_KEY environment variable.')
	}

	await clerkSetup({
		publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
	})

	if (!process.env.E2E_CLERK_USER_USERNAME || !process.env.E2E_CLERK_USER_PASSWORD) {
		throw new Error(
			'Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.'
		)
	}
})
