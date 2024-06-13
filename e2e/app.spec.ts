import { test, expect } from '@playwright/test'
import { setupClerkTestingToken } from '@clerk/testing/playwright'

const URL_SIGN_IN = '/sign-in'
const URL_ADMIN = '/admin'
const URL_PROFILE = '/admin/profile'
const URL_PROTECTED_ROUTE = '/some/random/protected-route/foo'
const URL_ROOT = '/'

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

		await page.goto(URL_ROOT)
		const signInButton = page.getByTestId('sign-in')
		await signInButton.click()

		await page.waitForURL(URL_SIGN_IN)
		await expect(page.locator("h1")).toContainText("Sign in")
    await page.waitForSelector('.cl-signIn-root', { state: 'attached' })

		await page.locator('input[name=identifier]').fill(process.env.E2E_CLERK_USER_USERNAME!)
		await page.getByRole('button', { name: 'Continue', exact: true }).click()
		await page.locator('input[name=password]').fill(process.env.E2E_CLERK_USER_PASSWORD!)
		await page.getByRole('button', { name: 'Continue', exact: true }).click()

		await page.waitForURL('/admin')
	})
})
