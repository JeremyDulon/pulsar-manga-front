<template>
  <q-input v-bind="vAttrs"
           :type="showPassword ? 'text' : 'password'">
    <template v-slot:append>
      <q-icon
          :name="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
      />
    </template>
    <template v-for="(slot, k) in $slots" v-slot:[k]>
      <slot :name="k" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'PulsarPassword',
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    vAttrs () {
      return {
        label: 'Mot de passe',
        'bottom-slots': true,
        ...this.$attrs
      }
    }
  }
}
</script>
