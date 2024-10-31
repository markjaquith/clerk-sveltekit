import { test, expect } from '@playwright/test'
import { setupClerkTestingToken } from '@clerk/testing/playwright'

const URL_SIGN_IN = '/sign-in'
const URL_ADMIN = '/admin'
const URL_PROFILE = '/admin/profile'
const URL_PROTECTED_ROUTE = '/some/random/protected-route/foo'
const URL_ROOT = '/'
const SERVER_SECRET = 'SvelteKit is awesome'

test('User starts logged out', async ({ page }) => {
	await page.goto('/')
	const signIn = page.getByTestId('sign-in')
	await expect(signIn).toBeVisible({ timeout: 30_000 })
})

test('User cannot access admin if not logged in', async ({ page }) => {
	await page.goto(URL_ADMIN)
	await page.waitForURL(URL_SIGN_IN)
	await page.goto(URL_PROFILE)
	await page.waitForURL(URL_SIGN_IN)
})

test('User cannot access function-based protected route if not logged in', async ({ page }) => {
	await page.goto(URL_PROTECTED_ROUTE)
	await page.waitForURL(URL_SIGN_IN)
})

test.describe('app', () => {
	test('sign in', async ({ page }) => {
		await setupClerkTestingToken({ page })

		// Navigate to sign in page.
		await page.goto(URL_ROOT)
		const signInButton = page.getByTestId('sign-in')
		await signInButton.click()

		// Sign in with email and password
		await page.waitForURL(URL_SIGN_IN)
		await expect(page.locator('h1')).toContainText('Sign in')
		await page.waitForSelector('.cl-signIn-root', { state: 'attached' })
		await page.locator('input[name=identifier]').fill(process.env.E2E_CLERK_USER_USERNAME!)
		await page.getByRole('button', { name: 'Continue', exact: true }).click()
		await page.locator('text="Use another method"').click()
		await page.locator('text="Sign in with your password"').click()
		await page.locator('input[name=password]').fill(process.env.E2E_CLERK_USER_PASSWORD!)
		await page.getByRole('button', { name: 'Continue', exact: true }).click()

		// Arrive at the admin page.
		await page.waitForURL('/admin')
		const serverSecret = page.getByTestId('server-secret')
		await expect(serverSecret).toContainText(SERVER_SECRET)

		// Can see the user button.
		const userButton = page.getByTestId('user-button')
		await expect(userButton).toBeVisible()

		// Find an img within userButton and click it.
		const userButtonImage = userButton.locator('img')
		await expect(userButtonImage).toBeVisible()
		await userButtonImage.click()

		// Can see the sign out button.
		const signOut = page.locator('.cl-button__signOut')
		await expect(signOut).toBeVisible()
		await signOut.click()

		// Arrive at the front page, not signed in.
		await page.waitForURL(URL_ROOT)
		await expect(signInButton).toBeVisible()
		await expect(userButton).not.toBeVisible()
	})
})
