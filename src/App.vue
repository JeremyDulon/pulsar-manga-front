<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import 'lodash'
import { REFRESH_DATA } from '@/store/action-types'
export default {
  name: 'App',
  created () {
    this.$store.dispatch(REFRESH_DATA)
  }
}
</script>
