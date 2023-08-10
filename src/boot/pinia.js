import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import router from '@/router/index'
import { markRaw } from 'vue'

export default boot(({ app }) => {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.$router = markRaw(router)
  })
  app.use(pinia)
})
