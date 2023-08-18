<template>
    <div class="fit row wrap justify-center items-center content-center">
      <q-card>
        <q-card-section class="text-center">
          Vertical Orientation
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center">
          <q-radio v-model="userConfigStore.readSettings.vertical" :val="false" label="Horizontal" />
          <q-radio v-model="userConfigStore.readSettings.vertical" :val="true" label="Vertical" />
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section class="text-center">
          Read Direction
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center">
          <template v-if="userConfigStore.readSettings.vertical === false">
            <q-radio v-model="userConfigStore.readSettings.read" val="ltr" label="Left to Right" />
            <q-radio v-model="userConfigStore.readSettings.read" val="rtl" label="Right to Left" />
          </template>
          <template v-else>
            <q-radio v-model="userConfigStore.readSettings.read" val="ttb" label="Top to Bottom" />
            <q-radio v-model="userConfigStore.readSettings.read" val="btt" label="Bottom to Top" />
          </template>
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
      localStorage.setItem(USER_CONFIG_KEY, JSON.stringify(state.readSettings))
    })
  },
  computed: {
    ...mapStores(useUserConfigStore)
  }
}
</script>
