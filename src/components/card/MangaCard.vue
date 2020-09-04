<template>
  <q-card :manga="manga" dark class="manga-card" @click="goToManga(manga.slug)">
    <q-img :src="manga.image && manga.image.url"
           :height="'80%'"
           contain
           class="manga-img">
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>
    <q-item class="q-px-xs q-py-none manga-container">
      <q-item-section>
        <q-item-label :lines="1" class="manga-title">{{ manga.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>

export default {
  name: 'MangaCard',
  props: {
    manga: {
      type: Object
    }
  },
  methods: {
    goToManga (slug) {
      this.$router.push({ name: 'manga', params: { slug: slug } })
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
    font-size: 3vw;
  }
  .manga-container {
    min-height: 30px;
  }
</style>
