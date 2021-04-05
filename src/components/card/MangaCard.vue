<template>
  <q-card flat square
          @click="goToManga">
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
    <q-item class="q-py-sm q-px-none manga-label">
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
    goToManga () {
      this.$router.push({ name: 'manga', params: { slug: this.manga.slug } })
    }
  }
}
</script>
