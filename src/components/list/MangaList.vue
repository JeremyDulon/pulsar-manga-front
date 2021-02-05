<template>
  <div class="q-pa-xs row q-gutter-xs manga-list">
    <q-intersection once :threshold="0.75" class="manga"
         v-for="manga in mangaList"
         :key="manga.i">
      <manga-card :manga="manga"/>
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
    display: -webkit-box;
    display: -ms-flexbox;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    display: flex;
    justify-content: space-between;
  }

  .manga {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 calc(10% - 15px);
    flex: 0 0 calc(10% - 15px);
    min-width: 150px;
    padding: 5px;
  }

  @media screen and (max-width: 769px) {
    .manga {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 calc(33% - 10px);
      flex: 0 0 calc(33% - 10px);
      min-width: 90px;
    }
  }
</style>
