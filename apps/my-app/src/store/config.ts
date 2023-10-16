import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export default defineStore(
  'config',
  () => {
    // State

    /** i18n Local preference */
    const locale: Ref<string> = ref(
      window.navigator.languages[0] ?? window.navigator.language
    )
    /** Dark Theme mode */
    const theme: Ref<boolean> = ref(
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    // Actions

    /**
     * Set Locale.
     *
     * @param locale - Locale
     */
    const setLocale = (l: string) => (locale.value = l)

    /** Toggle Dark/Light mode */
    const toggleTheme = () => (theme.value = !theme.value)

    return { theme, toggleTheme, setLocale }
  },
  {
    // Data persistence destination
    persist: {
      key: import.meta.env.APP_WEBSTORAGE_NAMESPACE ?? 'my-app',
      storage: localStorage
    }
  }
)
