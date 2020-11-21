import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters['user/isLogged']) {
    next({ name: 'login' })
    return
  }
  if (to.name === 'login' && store.getters['user/isLogged']) {
    next({ name: 'home' })
    return
  }
  next()
})
export default router
