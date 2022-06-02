import {
  mapActions,
  mapGetters
  // mapMutations,
  // createNamespacedHelpers
} from 'vuex'

export const list = (module) => {
  const lowmod = module.toLowerCase()
  const getters = mapGetters({
    items: `${lowmod}/list/items`,
    totalItems: `${lowmod}/list/totalItems`
  })
  const actions = mapActions({
    getItems: `${lowmod}/list/getItems`
  })
  return { getters, actions }
}
