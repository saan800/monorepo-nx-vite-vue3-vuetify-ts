import { defineConfig, mergeConfig } from 'vite'
import { configDefaults } from 'vitest/config'
// import { fileURLToPath } from 'node:url'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    // test: {
    //   environment: 'jsdom',
    //   exclude: [...configDefaults.exclude, 'e2e/*'],
    //   root: fileURLToPath(new URL('./', import.meta.url)),
    //   transformMode: {
    //     web: [/\.[jt]sx$/]
    //   }
    // }
    test: {
      environment: 'jsdom',
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest'
      },
      coverage: {
        clean: true,
        reporter: ['text', 'json-summary', 'json']
      },
      exclude: [...configDefaults.exclude, 'e2e/*'],
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      outputFile: '../../reports/unit-tests/my-app.xml'
    }
  })
)
