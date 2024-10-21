<template>
    <div class="fit row wrap justify-center items-center content-center">
      <q-card>
        <q-card-section class="flex flex-center">
            <h6>Read Direction</h6>
            <div>
              <q-radio v-model="userConfigStore.readMode.direction" val="ltr" label="Left to Right" />
              <q-radio v-model="userConfigStore.readMode.direction" val="rtl" label="Right to Left" />
              <q-radio v-model="userConfigStore.readMode.direction" val="ttb" label="Top to Bottom" />
            </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center">
            <h6>Read Mode</h6>
            <div>
              <q-radio v-model="userConfigStore.readMode.mode" val="manual" label="Manual" />
              <q-radio v-model="userConfigStore.readMode.mode" val="auto" label="Auto" />
            </div>
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
