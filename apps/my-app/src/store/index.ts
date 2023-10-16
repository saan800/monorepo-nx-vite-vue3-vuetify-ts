import { createPinia, type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useConfig from '@/store/config'
import useGlobal from '@/store/global'

const pinia: Pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useConfig, useGlobal }
