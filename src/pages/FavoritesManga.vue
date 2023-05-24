<template>
  <q-page>
    <favorite-list :favorite-comic-language-list="favoriteComicLanguageList" />
  </q-page>
</template>

<script>
import FavoriteList from 'components/list/FavoritesList'
import { mapGetters } from 'vuex'

export default {
  name: 'FavoritesManga',
  components: { FavoriteList },
  computed: {
    ...mapGetters({
      favoriteComicLanguageList: 'user/comicLanguage/items'
    })
  }
}
</script>
