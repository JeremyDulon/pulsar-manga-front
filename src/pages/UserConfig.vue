<template>
    <div class="fit row wrap justify-center items-center content-center">
      <q-card>
        <q-card-section class="text-center">
          Read Direction
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center">
            <q-radio v-model="userConfigStore.readMode" val="ltr" label="Left to Right" />
            <q-radio v-model="userConfigStore.readMode" val="rtl" label="Right to Left" />
            <q-radio v-model="userConfigStore.readMode" val="ttb" label="Top to Bottom" />
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { USER_CONFIG_KEY, useUserConfigStore } from '@/stores/userConfig'

export default {
  name: 'UserConfig',
  mounted () {
    this.userConfigStore.$subscribe((mutation, state) => {
      localStorage.setItem(USER_CONFIG_KEY, JSON.stringify(state.readMode))
    })
  },
  computed: {
    ...mapStores(useUserConfigStore)
  }
}
</script>
