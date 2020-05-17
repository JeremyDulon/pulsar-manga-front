<template>
  <div class="row manga-list">
    <q-intersection once :threshold="0.75" class="col-xs-4 col-sm-3 col-lg-2 q-pa-xs"
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

<style>
  .manga-list {
    align-items: stretch;
  }
  .q-intersection > :first-child {
    height: 100%;
  }
</style>
