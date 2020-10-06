<template>
  <q-layout view="lHh lpr lFf" v-if="isLogged">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white text-primary">
      <q-tabs active-color="purple" indicator-color="transparent" class="text-grey">
        <q-route-tab icon="fas fa-fire-alt" :to="{ name: 'home' }" />
        <q-route-tab icon="fas fa-search" :to="{ name: 'search' }" />
        <q-route-tab icon="fas fa-star" :to="{ name: 'favorites' }" />
        <q-route-tab icon="fas fa-cog" :to="{ name: 'userConfig' }" />
        <q-route-tab icon="fas fa-th-list" to="/" />
        <q-route-tab icon="fas fa-plus" :to="{ name: 'addSource' }" />
      </q-tabs>
    </q-footer>
  </q-layout>
  <q-layout v-else>
    <q-page-container>
      <q-page class="row flex-center bg-blue-grey-4" padding>
        <div class="col-12 col-md text-center">
          <img alt="Pulsar" src="~assets/quasar-logo-full.svg"
               style="width: 90vw; max-width: 512px">
        </div>
        <div class="col-12 col-md">
          <form-login v-model="formUser" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import FormLogin from 'components/forms/FormLogin'
const storeUser = createNamespacedHelpers('user')

export default {
  name: 'TabsLayout',
  components: { FormLogin },
  data () {
    return {
      formUser: {
        username: null
      }
    }
  },
  computed: {
    ...storeUser.mapGetters({
      isLogged: 'isLogged'
    })
  }
}
</script>
