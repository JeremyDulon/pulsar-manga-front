<template>
  <div>
    <img
      :src="flagPath"
      :style="'max-width: ' + width"
    >
  </div>
</template>

<script>
import { flagImg } from '@/utils/img'

export default {
  name: 'PulsarFlag',
  props: {
    language: {
      type: String
    },
    width: {
      type: String,
      default: () => '20px'
    }
  },
  computed: {
    flagPath () {
      return flagImg(this.language)
    }
  }
}
</script>
