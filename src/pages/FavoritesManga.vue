<template>
  <q-page>
    <manga-list :manga-list="getFavorites" />
  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
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
  }
}
</script>
