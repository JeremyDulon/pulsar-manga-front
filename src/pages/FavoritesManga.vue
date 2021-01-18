<template>
  <q-page>
    <manga-list :manga-list="mangaList" />
  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
import { getFavoritesList } from '@/utils/manga'

import { createNamespacedHelpers } from 'vuex'
const storeUser = createNamespacedHelpers('user')

export default {
  name: 'FavoritesManga',
  components: { MangaList },
  data () {
    return {
      mangaList: []
    }
  },
  computed: {
    ...storeUser.mapGetters({
      getFavorites: 'getFavorites'
    })
  },
  async created () {
    this.mangaList = await getFavoritesList()
  }
}
</script>
