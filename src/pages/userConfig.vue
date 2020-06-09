<template>
  <q-page>
    <div class="q-gutter-sm">
      <q-radio v-model="vertical"  @click="setVertical()" val="false" label="Horizontal" ></q-radio>
      <q-radio v-model="vertical" @click="setVertical()" val="true" label="Vertical" ></q-radio>
    </div>
  </q-page>
</template>

<script>
// import MangaList from 'components/list/MangaList'
// import { getFilteredList } from '@/utils/manga'

// import { createNamespacedHelpers } from 'vuex'
// const storeUserConfig = createNamespacedHelpers('userConfig')

export default {
  name: 'UserConfig',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    vertical: {
      get () {
        console.log(this.$store.state)
        return this.$store.state.userConfig.vertical
      },
      set (vertical) {
        this.$store.commit('setVertical', vertical)
      }
    }
  },
  async created () {
  }
}
</script>
