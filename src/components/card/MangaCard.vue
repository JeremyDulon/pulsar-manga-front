<template>
  <q-card :manga="manga" flat @click="goToManga(manga.slug)">
    <q-img :src="manga.image && manga.image.url"
           :contain="false"
           :ratio="2/3"
           class="manga-img">
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>
    <q-item class="q-pa-none">
      <q-item-section>
        <q-item-label :lines="1" class="manga-title text-uppercase">{{ manga.title }}</q-item-label>
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
  /*.manga-card {*/
  /*  height: 100%;*/
  /*}*/
  /*.manga-img {*/
  /*  height: 85%;*/
  /*}*/
  /*.manga-title {*/
  /*  font-size: 3vw;*/
  /*}*/
  /*.manga-container {*/
  /*  min-height: 30px;*/
  /*}*/
</style>
