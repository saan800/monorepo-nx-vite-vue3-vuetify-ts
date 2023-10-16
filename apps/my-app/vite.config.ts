import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/my-app',
  build: {
    target: browserslistToEsbuild(),
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to vuetify deps. Reducing the vendor chunk size
          if (id.includes('/vuetify/')) {
            return 'vuetify'
          }
          if (
            id.includes('/node_modules/vue/') ||
            id.includes('/node_modules/vue-') ||
            id.includes('/node_modules/@vue/')
          ) {
            return 'vue'
          }
        }
      }
    }
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
    splitVendorChunkPlugin(),
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
    }),
    // this must be last
    visualizer({
      filename: 'bundle-stats.html',
      gzipSize: true
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
