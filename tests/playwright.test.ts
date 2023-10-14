// Write a Playwright test to fetch the front page and assert its title.
// Use ESM.
// Run with: npx playwright test
import { test, expect } from '@playwright/test';

test('h1 exists', async ({ page }) => {
	await page.goto('/');
	const title = page.locator('h1');
	await expect(title).toHaveText('Clerk SvelteKit');
});
