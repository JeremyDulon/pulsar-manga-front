<template>
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
</template>
<script>
import FormLogin from 'components/forms/FormLogin'

export default {
  name: 'TabsLayout',
  components: { FormLogin },
  data () {
    return {
      formUser: {
        username: null,
        password: null
      }
    }
  }
}
</script>
