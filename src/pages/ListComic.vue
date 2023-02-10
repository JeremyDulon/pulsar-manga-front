<template>
  <q-page>
    <comic-list :comic-list="comicList" />
  </q-page>
</template>

<script>
import ComicList from 'components/comic/ComicList'
import { list } from '@/utils/vuexer'
const { getters: comicGetters, actions: comicActions } = list('Comic')

export default {
  name: 'ListComic',
  components: { ComicList },
  data () {
    return {}
  },
  created () {
    this.onCreated()
  },
  methods: {
    ...comicActions,
    onCreated () {
      this.getItems()
    }
  },
  computed: {
    comicList: comicGetters.items
  }
}
</script>
