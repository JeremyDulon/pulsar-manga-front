<template>
  <q-page>
    <manga-list :manga-list="mangaList" />
  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
import { getFilteredList } from '@/utils/manga'

export default {
  name: 'Index',
  components: { MangaList },
  data () {
    return {
      mangaList: []
    }
  },
  async created () {
    // this.mangaList = await getFilteredList((manga) => {
    //   return manga.h > 40000000
    // })
    this.mangaList = await getFilteredList()
  }
}
</script>
