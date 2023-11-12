import { sveltekit } from '@sveltejs/kit/vite'
import icons from 'unplugin-icons/vite'
import kitDocs from '@svelteness/kit-docs/node'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	resolve: {
		alias: {
			$fonts: resolve(process.cwd(), 'src/internal/fonts'),
			$internal: resolve(process.cwd(), 'src/internal'),
		},
	},
	plugins: [
		icons({ compiler: 'svelte' }),
		kitDocs({
			markdown: {
				shiki: {
					theme: 'material-ocean',
				},
			},
		}),
		sveltekit(),
	],
})
