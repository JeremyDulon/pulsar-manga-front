<template>
  <q-layout view="lHh lpr lFf" v-if="isLogged">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="text-primary">
      <q-tabs active-color="amber-5" indicator-color="transparent" class="text-grey">
        <q-route-tab icon="fas fa-fire-alt" :to="{ name: 'home' }" />
        <q-route-tab icon="fas fa-search" :to="{ name: 'search' }" />
        <q-route-tab icon="fas fa-star" :to="{ name: 'favorites' }" />
        <q-route-tab icon="fas fa-cog" :to="{ name: 'userConfig' }" />
        <q-route-tab icon="fas fa-th-list" to="/" />
        <q-route-tab v-if="isAdmin" icon="fas fa-plus" :to="{ name: 'addSource' }" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const storeUser = createNamespacedHelpers('user')

export default {
  name: 'TabsLayout',
  computed: {
    ...storeUser.mapGetters({
      isLogged: 'isLogged',
      isAdmin: 'isAdmin'
    })
  }
}
</script>
