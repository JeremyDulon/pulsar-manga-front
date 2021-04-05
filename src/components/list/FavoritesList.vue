<template>
  <div class="q-pa-xs row q-gutter-xs manga-list large">
    <q-intersection once :threshold="0.75" class="manga"
                    v-for="manga in mangaList"
                    :key="manga.manga_platform.id">
      <favorite-card :user-manga-platform="manga" />
    </q-intersection>
  </div>
</template>

<script>
import FavoriteCard from 'components/card/FavoriteCard'
export default {
  name: 'FavoriteList',
  components: { FavoriteCard },
  props: {
    mangaList: {
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
