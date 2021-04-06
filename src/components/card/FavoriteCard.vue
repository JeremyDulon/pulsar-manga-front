<template>
  <q-card @click="goToManga"
          square>
    <q-card-section horizontal>
      <q-img :src="manga.image && manga.image.url"
             :contain="true"
             :ratio="2/2"
             class="manga-img col-3">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
      </q-img>

      <q-card-section class="col-6">
        <div>
          <span class="text-weight-bold text-subtitle1 text-uppercase">{{ manga.title }}</span>
        </div>
        <div>
          <span class="text-weight-medium">
            Last read Chapter: #{{ lastChapter.number }}
            <span v-if="userMangaPlatform.last_page" class="text-italic">(page: {{ userMangaPlatform.last_page }})</span>
          </span>
        </div>
      </q-card-section>

      <q-card-actions vertical class="col-3 q-px-md">
        <q-btn flat round color="red" icon="favorite" @click.stop="toggleFavorite"/>
        <q-btn flat round color="accent" icon="bookmark" @click.stop="goToChapter">
          <q-tooltip>Resume reading</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'FavoriteCard',
  props: {
    userMangaPlatform: {
      type: Object
    }
  },
  methods: {
    goToManga () {
      this.$router.push({ name: 'manga', params: { slug: this.manga.slug } })
    },
    goToChapter () {
      let params = { id: this.lastChapter.id, manga: this.manga.slug }
      if (this.userMangaPlatform.last_page) {
        params.page = this.userMangaPlatform.last_page
      }
      this.$router.push({ name: 'chapter', params: params })
    },
    toggleFavorite () {
      console.log('TODO')
    }
  },
  computed: {
    lastChapter () {
      return this.userMangaPlatform.last_chapter
    },
    latestChapter () {
      return 'TODO'
    },
    manga () {
      return this.userMangaPlatform.manga_platform.manga
    }
  }
}
</script>
