import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'
import { useGlobal } from '@/store'
import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About-[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: async () => await import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /*
  scrollBehavior: (to, _from, savedPosition) => {
    let scrollTo: number | string = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.top;
    }
    return goTo(scrollTo);
  },
  */
  routes
})

// Global before guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards}
router.beforeEach(
  async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const globalStore = useGlobal()
    // Show Loading
    // comment out for https://github.com/logue/vite-vuetify-ts-starter/issues/16
    // globalStore.setLoading(true);

    // Hide snack bar
    globalStore.setMessage('')
    next()
  }
)

// Global After Hooks
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks}
router.afterEach(() => {
  const globalStore = useGlobal()
  // Hide Loading
  globalStore.setLoading(false)
})

export default router
