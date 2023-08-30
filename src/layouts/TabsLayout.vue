<template>
  <q-layout view="hHh lpR fFf" v-if="authStore.isLogged">
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
    <q-footer class="text-primary">
      <q-tabs v-model="$route.name" active-color="amber-5" indicator-color="transparent" class="text-grey">
        <q-route-tab name="home" icon="fas fa-fire-alt" :to="{ name: 'home' }" />
        <q-route-tab name="search" icon="fas fa-search" :to="{ name: 'search' }" />
        <q-route-tab name="favorites" icon="fas fa-star" :to="{ name: 'favorites' }" />
        <q-route-tab name="userConfig" icon="fas fa-cog" :to="{ name: 'userConfig' }" />
        <q-tab icon="fas fa-sign-out-alt" v-on:click="logout" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
import { useAuthStore } from '@/stores/auth'
import { mapStores } from 'pinia'

export default {
  name: 'TabsLayout',
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    logout () {
      this.authStore.doLogout()
    }
  }
}
</script>
