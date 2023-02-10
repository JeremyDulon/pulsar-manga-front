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
    getItems: `${lowmod}/list/retrieveListItems`
  })
  return { getters, actions }
}

export const show = (module) => {
  const lowmod = module.charAt(0).toLowerCase() + module.slice(1)
  const getters = mapGetters({
    item: `${lowmod}/show/item`
  })
  const actions = mapActions({
    getItem: `${lowmod}/show/getItem`,
    getLanguageIssues: `${lowmod}/show/retrieveLanguageIssues`
  })
  return { getters, actions }
}
