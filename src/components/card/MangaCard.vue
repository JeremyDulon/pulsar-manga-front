<template>
  <q-card :manga="manga" dark class="manga-card" @click="goToManga(manga.i)">
    <q-img :src="mangaImage" contain class="manga-img"/>
    <q-item class="q-px-xs q-py-none manga-container">
      <q-item-section>
        <q-item-label :lines="1" class="manga-title">{{ manga.t }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { getMangaImgUrl } from '@/utils/manga'

export default {
  name: 'MangaCard',
  props: {
    manga: {
      type: Object
    }
  },
  methods: {
    goToManga (id) {
      this.$router.push({ name: 'manga', params: { id: id } })
    }
  },
  computed: {
    mangaImage () {
      return getMangaImgUrl(this.manga.im)
    }
  }
}
</script>

<style>
  .manga-card {
    height: 100%;
  }
  .manga-img {
    height: 85%;
  }
  .manga-title {
    font-size: 2vh;
  }
  .manga-container {
    min-height: 30px;
  }
</style>
