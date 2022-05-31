<template>
  <div class="q-pa-xs row q-gutter-xs manga-list">
    <q-intersection once :threshold="0.75" class="manga"
         v-for="comic in comicList"
         :key="comic.id">
      <comic-card :comic="comic" />
    </q-intersection>
  </div>
</template>

<script>
import ComicCard from 'components/card/ComicCard'
export default {
  name: 'ComicList',
  components: { ComicCard },
  props: {
    comicList: {
      type: Array,
      default: () => []
    }
  }
}

</script>
