<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white text-primary">
      <q-tabs active-color="primary" indicator-color="transparent" class="text-grey">
        <q-route-tab icon="fas fa-fire-alt" :to="{ name: 'home' }" />
        <q-route-tab icon="fas fa-search" :to="{ name: 'search' }" />
        <q-route-tab icon="fas fa-star" to="/" />
        <q-route-tab icon="fas fa-th-list" to="/" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  name: 'TabsLayout'
}
</script>
