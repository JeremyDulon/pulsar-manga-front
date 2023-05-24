<template>
  <div class="q-pa-xs row q-gutter-xs manga-list large">
    <q-intersection once :threshold="0.75" class="manga"
                    v-for="favoriteComicLanguage in favoriteComicLanguageList"
                    :key="favoriteComicLanguage.id">
      <favorite-card :favorite-comic-language="favoriteComicLanguage" />
    </q-intersection>
  </div>
</template>

<script>
import FavoriteCard from 'components/card/FavoriteCard'

export default {
  name: 'FavoriteList',
  components: { FavoriteCard },
  props: {
    favoriteComicLanguageList: {
      type: Array,
      default: () => []
    },
    short: {
      type: Boolean,
      default: true
    }
  }
}

</script>
