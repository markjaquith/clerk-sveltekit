import { defineConfig, devices } from '@playwright/test'

// Use process.env.PORT by default and fallback to port 4173
const PORT = process.env.PORT || 4173

const baseURL = `http://localhost:${PORT}`

export default defineConfig({
	timeout: 30 * 1000,
	testDir: 'e2e',
	retries: 1,
	outputDir: 'test-results/',
	webServer: {
		command: 'bun run build && bun run preview',
		url: baseURL,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},

	use: {
		baseURL,
		trace: 'retry-with-trace',
		headless: true,
	},

	projects: [
		{
			name: 'global setup',
			testMatch: /global\.setup\.ts/,
		},
		{
			name: 'Desktop Chrome',
			use: {
				...devices['Desktop Chrome'],
			},
			dependencies: ['global setup'],
		},
	],
})
