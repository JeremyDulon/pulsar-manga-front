<template>
  <q-page>
    <comic-list :comic-list="items" />
  </q-page>
</template>

<script>
import ComicList from 'components/comic/ComicList'
import { list } from '@/utils/vuexer'
const { getters, actions } = list('Comic')

export default {
  name: 'HomeComic',
  components: { ComicList },
  data () {
    return {}
  },
  created () {
    this.onCreated()
  },
  beforeDestroy () {
    this.onBeforeDestroy()
  },
  methods: {
    ...actions,
    onCreated () {
      this.getItems().then(data => console.log(data))
    },
    onBeforeDestroy () {
      this.reset()
    }
  },
  computed: getters
}
</script>
