import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const vitest = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    coverage: {
      provider: 'v8',
      clean: true,
      reporter: ['text', 'json-summary', 'json']
    },
    deps: {
      optimizer: {
        web: {
          include: ['vuetify']
        }
      }
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    exclude: [...configDefaults.exclude, 'e2e/*'],
    include: [
      'src/*.test.ts',
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    outputFile: '../../reports/unit-tests/my-app.xml'
  }
})

export default mergeConfig(viteConfig, vitest)
// for vitest v1
// export default defineConfig((configEnv) =>
//   mergeConfig(viteConfig, vitest(configEnv))
// )
