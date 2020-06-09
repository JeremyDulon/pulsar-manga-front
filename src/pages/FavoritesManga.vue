<template>
  <q-page>
    <manga-list :manga-list="mangaList" />
  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
import { getFilteredList } from '@/utils/manga'

import { createNamespacedHelpers } from 'vuex'
const storeFavorites = createNamespacedHelpers('favorites')

export default {
  name: 'FavoritesManga',
  components: { MangaList },
  data () {
    return {
      mangaList: []
    }
  },
  computed: {
    ...storeFavorites.mapGetters({
      getFavorites: 'getFavorites'
    })
  },
  async created () {
    this.mangaList = await getFilteredList((manga) => this.getFavorites.includes(manga.i))
  }
}
</script>
