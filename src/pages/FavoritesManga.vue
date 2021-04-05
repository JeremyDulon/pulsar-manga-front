<template>
  <q-page>
    <favorite-list :manga-list="mangaList" />
  </q-page>
</template>

<script>
import { getFavoritesList } from '@/utils/manga'
import FavoriteList from 'components/list/FavoritesList'

export default {
  name: 'FavoritesManga',
  components: { FavoriteList },
  data () {
    return {
      mangaList: []
    }
  },
  async created () {
    this.mangaList = await getFavoritesList()
  }
}
</script>
