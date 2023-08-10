/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/my-app',

  server: {
    port: 4200,
    host: 'localhost',
    https: true,
    open: true
  },

  preview: {
    port: 4300,
    host: 'localhost',
    https: true,
    open: true
  },

  plugins: [
    basicSsl(),
    vue({
      template: {
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin#image-loading
        transformAssetUrls
      }
    }),
    // Vuetify Loader
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/styles/settings.scss' }
    }),
    viteTsConfigPaths({
      root: '../../'
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    coverage: {
      clean: true,
      reporter: ['text', 'json-summary', 'json']
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    outputFile: '../../reports/unit-tests/my-app.xml'
  }
})
