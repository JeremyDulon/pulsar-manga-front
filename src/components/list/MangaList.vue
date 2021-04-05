<template>
  <div class="q-pa-xs row q-gutter-xs manga-list">
    <q-intersection once :threshold="0.75" class="manga"
         v-for="manga in mangaList"
         :key="manga.i">
      <manga-card :manga="manga" />
    </q-intersection>
  </div>
</template>

<script>
import MangaCard from 'components/card/MangaCard'
export default {
  name: 'MangaList',
  components: { MangaCard },
  props: {
    mangaList: {
      type: Array,
      default: () => []
    }
  }
}

</script>
