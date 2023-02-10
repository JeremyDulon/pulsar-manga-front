<template>
  <q-card flat square
          @click="goToComic">
    <q-img :src="comic.image && comic.image.url"
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
        <q-item-label :lines="1" class="manga-title text-uppercase">{{ comic.title }}</q-item-label>
        <q-item-label :lines="1" class="manga-title text-uppercase">{{ comicLanguages }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>

export default {
  name: 'ComicCard',
  props: {
    comic: {
      type: Object
    }
  },
  methods: {
    goToComic () {
      this.$router.push({ name: 'comic', params: { id: this.comic.id } })
    }
  },
  computed: {
    comicLanguages () {
      return this.comic.comicLanguages && this.comic.comicLanguages.map(comicLanguage => comicLanguage.language).join('|')
    }
  }
}
</script>
