<template>
  <q-card @click="goToManga"
          square>
    <q-card-section horizontal>
      <q-badge v-if="latestChapter.number > lastChapter.number"
               color="red" floating>
        NEW: #{{ latestChapter.number }} {{ latestChapterDate }}
      </q-badge>
      <q-img :src="manga.image && manga.image.url"
             :contain="false"
             :ratio="1"
             class="manga-img col-3">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
      </q-img>

      <q-card-section class="col-7">
        <q-item-label :lines="1" class="text-weight-bold text-subtitle2 text-uppercase">
          {{ manga.title }}
          <q-tooltip :content-class="'text-uppercase'">
            {{ manga.title }}
          </q-tooltip>
        </q-item-label>
        <div>
          <span v-if="lastChapter" class="text-weight-medium">
            #{{ lastChapter.number }}
            <span v-if="userMangaPlatform.last_page" class="text-italic"> (page: {{ userMangaPlatform.last_page }})</span>
          </span>
        </div>
      </q-card-section>

      <q-card-actions vertical class="col-2 q-px-md">
        <q-btn flat round color="red" :icon="favoriteIcon" @click.stop="addFavorite(userMangaPlatform.manga_platform.id)"/>
        <q-btn flat round color="accent" icon="fas fa-bookmark" @click.stop="goToChapter">
          <q-tooltip>Resume reading</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import { dateFormatIso } from '@/utils/date'
import { createNamespacedHelpers } from 'vuex'
const storeUser = createNamespacedHelpers('user')
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
    ...storeUser.mapActions({
      addFavorite: 'addFavorite'
    }),
    ...storeUser.mapGetters({
      getFavorite: 'getFavorite'
    })
  },
  computed: {
    stateFavorite () {
      return this.getFavorite()(this.manga.slug)
    },
    favoriteIcon () {
      return (this.stateFavorite && this.stateFavorite.favorite ? 'fas' : 'far') + ' fa-heart'
    },
    lastChapter () {
      return this.userMangaPlatform.last_chapter
    },
    latestChapter () {
      return this.userMangaPlatform.manga_platform.latest_chapter
    },
    manga () {
      return this.userMangaPlatform.manga_platform.manga
    },
    latestChapterDate () {
      return dateFormatIso(this.latestChapter.date)
    }
  }
}
</script>
