<template>
  <q-page>
    <comic-list :comic-list="items" />
  </q-page>
</template>

<script>
import ComicList from 'components/list/ComicList'
import { list } from '@/utils/vuexer'
const { getters, actions } = list('Comic')

export default {
  name: 'HomeComic',
  components: { ComicList },
  data () {
    return {}
  },
  created () {
    this.getItems()
  },
  methods: actions,
  computed: getters
}
</script>
