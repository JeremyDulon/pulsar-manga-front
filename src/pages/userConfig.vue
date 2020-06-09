<template>
  <q-page>
    <div class="q-gutter-sm">
      <q-radio v-model="vertical" val="false" label="Horizontal" ></q-radio>
      <q-radio v-model="vertical" val="true" label="Vertical" ></q-radio>
    </div>
     <div v-if="vertical == 'false'" class="q-gutter-sm">
      <q-radio v-model="transitionNext" val="left" label="Left" ></q-radio>
      <q-radio v-model="transitionNext" val="right" label="Right" ></q-radio>
    </div>
    <div v-if="vertical == 'true'" class="q-gutter-sm">
      <q-radio v-model="transitionNext" val="up" label="Up" ></q-radio>
      <q-radio v-model="transitionNext" val="down" label="Down" ></q-radio>
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
        return this.$store.state.userConfig.vertical
      },
      set (vertical) {
        this.$store.commit('userConfig/setVertical', vertical)
      }
    },
    transitionNext: {
      get () {
        return this.$store.state.userConfig.transitionNext
      },
      set (transition) {
        this.$store.commit('userConfig/setTransitionNext', transition)
      }
    },
    transitionPrev: {
      get () {
        return this.$store.state.userConfig.transitionPrev
      },
      set (transition) {
        this.$store.commit('userConfig/setTransitionPrev', transition)
      }
    }
  },
  async created () {
  }
}
</script>
