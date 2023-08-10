import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createWebHashHistory(process.env.VUE_ROUTER_BASE)
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && authStore.isLogged === false) {
    next({ name: 'login' })
    return
  }
  if (to.name === 'login' && authStore.isLogged === true) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
