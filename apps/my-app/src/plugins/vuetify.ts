/**
 * Framework documentation: https://vuetifyjs.com`
 */
import { createVuetify, type VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// Translations provided by Vuetify
import { en } from 'vuetify/locale'

import { loadFonts } from '@/plugins/webfontloader'
import '@/styles/main.scss'

await loadFonts()

let vuetifyConfig: VuetifyOptions = {
  // Icon Fonts
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  // Internationalization (i18n)
  // https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en }
  },
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6'
        }
      }
    }
  }
}

if (import.meta.env.DEV) {
  // Disable tree shaking for DEV mode.
  vuetifyConfig = {
    components,
    directives,
    ...vuetifyConfig
  }
}

export default createVuetify(vuetifyConfig)

// Export for test.
export { components, directives }
