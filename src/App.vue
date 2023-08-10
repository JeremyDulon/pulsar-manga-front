<template>
  <router-view />
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'App',
  computed: {
    ...mapStores(useUserStore)
  },
  mounted () {
    this.userStore.doFetchUser()
  }
}
</script>
