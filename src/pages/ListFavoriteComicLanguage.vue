<template>
  <q-page>
    <favorite-list :favorite-comic-language-list="favoriteStore.list" />
  </q-page>
</template>

<script>
import FavoriteList from 'components/list/FavoritesList'
import { mapStores } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'

export default {
  name: 'ListFavoriteComicLanguage',
  components: { FavoriteList },
  computed: {
    ...mapStores(useFavoriteStore)
  }
}
</script>
