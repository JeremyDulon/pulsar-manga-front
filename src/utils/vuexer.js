import {
  mapActions,
  mapGetters
  // mapMutations,
  // createNamespacedHelpers
} from 'vuex'

export const list = (module) => {
  const getters = mapGetters({
    items: `${module}/items`,
    totalItems: `${module}/totalItems`
  })
  const actions = mapActions({
    getItems: `${module}/retrieveListItems`
  })
  return { getters, actions }
}

export const show = (module) => {
  const getters = mapGetters({
    item: `${module}/item`
  })
  const actions = mapActions({
    getItem: `${module}/getItem`,
    getLanguageIssues: `${module}/retrieveLanguageIssues`
  })
  return { getters, actions }
}
