<template>
  <div>
    <div class="q-gutter-sm">
      <q-radio v-model="vertical" :val="false" label="Horizontal" />
      <q-radio v-model="vertical" :val="true" label="Vertical" />
    </div>
     <div v-if="!vertical" class="q-gutter-sm">
      <q-radio v-model="read" val="ltr" label="Left to Right" />
      <q-radio v-model="read" val="rtl" label="Right to Left" />
    </div>
    <div v-if="vertical" class="q-gutter-sm">
      <q-radio v-model="read" val="ud" label="Up to Down" />
      <q-radio v-model="read" val="du" label="Down to Up" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserConfig',
  watch: {
    vertical: {
      handler (v) {
        this.read = v === true ? 'ud' : 'rtl'
      }
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
    read: {
      get () {
        return this.$store.state.userConfig.read
      },
      set (read) {
        this.$store.commit('userConfig/setRead', read)
      }
    }
  }
}
</script>
