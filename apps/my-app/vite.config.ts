import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { defineConfig } from 'vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/my-app',
  build: {
    target: browserslistToEsbuild()
  },
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
      autoImport: true
      // styles: { configFile: 'src/styles/settings.scss' }
    }),
    viteTsConfigPaths({
      root: '../../'
    })
  ],
  resolve: {
    // alias: [
    //   {
    //     find: '@',
    //     replacement: fileURLToPath(new URL('./src', import.meta.url))
    //   }
    // ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  }

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
})
