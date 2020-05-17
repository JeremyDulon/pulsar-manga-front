<template>
  <q-page>
    <manga-list :manga-list="favorites" />
  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
import { mapState } from 'vuex'

export default {
  name: 'FavoritesManga',
  components: { MangaList },
  data () {
    return {
      mangaList: []
    }
  },
  computed: {
    ...mapState({
      favorites: 'favorites'
    })
  }
}
</script>
