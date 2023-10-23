import { test, expect } from '@playwright/test'

const TITLE = 'Clerk SvelteKit'
const EMAIL = 'tester+clerk_test@example.com'
const CODE = '424242'
const URL_SIGN_IN = '/sign-in'
const URL_ADMIN = '/admin'
const URL_ROOT = '/'
const SERVER_SECRET = 'SvelteKit is awesome'

test('User starts logged out', async ({ page }) => {
	await page.goto('/')
	const title = page.locator('h1')
	await expect(title).toHaveText(TITLE)
	const signIn = page.getByTestId('sign-in')
	await expect(signIn).toBeVisible()
})

test('User cannot access admin if not logged in', async ({ page }) => {
	await page.goto(URL_ADMIN)
	await page.waitForURL(URL_SIGN_IN)
})

test('User can log in', async ({ page }) => {
	// Navigate to sign in page.
	await page.goto(URL_ROOT)
	const signIn = page.getByTestId('sign-in')
	await signIn.click()
	
	// Submit the email.
	await page.waitForURL(URL_SIGN_IN)
	const email = page.locator('input[name="identifier"][type="email"]')
	await email.fill(EMAIL)
	await page.keyboard.press('Enter')
	
	// Submit the OTP.
	await page.waitForTimeout(5000)
	await page.screenshot({ path: 'test-results/after-email.png' });
	const firstCodeInputField = page.locator('input[name="codeInput-0"]')
	await expect(firstCodeInputField).toBeVisible()
	await firstCodeInputField.click()
	await page.keyboard.type(CODE, { delay: 150 }) // Need this slight delay to avoid flaky tests.
	await page.keyboard.press('Enter')

	// Arrive at the admin page.
	await page.waitForURL(URL_ADMIN)
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
	const signOut = page.locator('[data-localization-key="userButton.action__signOut"]')
	await expect(signOut).toBeVisible()
	await signOut.click()

	// Arrive at the front page, not signed in.
	await page.waitForURL(URL_ROOT)
	await expect(signIn).toBeVisible()
	await expect(userButton).not.toBeVisible()
})