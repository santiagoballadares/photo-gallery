/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		// support `describe`, `test` etc. globally,
		// so you don't need to import them every time
		globals: true,
		// run tests in jsdom environment
		environment: 'jsdom',
		// global test setup
		setupFiles: './tests/setup.ts',
		// setupFiles: ['./src/setupTests.ts'],
	},
})
