<template>
  <q-card @click="goToComicLanguage"
          square>
    <q-card-section horizontal>
      <q-badge v-if="latestChapter.number > lastComicIssue.number"
               color="red" floating>
        NEW: #{{ latestChapter.number }}
<!--        {{ latestChapterDate }}-->
      </q-badge>
      <q-img :src="favoriteComicLanguage.comicLanguage.comic.image && favoriteComicLanguage.comicLanguage.comic.image.url"
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
          {{ favoriteComicLanguage.comicLanguage.comic.title }}
          <q-tooltip :content-class="'text-uppercase'">
            {{ favoriteComicLanguage.comicLanguage.comic.title }}
          </q-tooltip>
        </q-item-label>
        <div>
          <span v-if="lastComicIssue" class="text-weight-medium">
            #{{ lastComicIssue.number }}
            <span v-if="favoriteComicLanguage.lastPage" class="text-italic"> (page: {{ favoriteComicLanguage.lastPage }})</span>
          </span>
        </div>
      </q-card-section>

      <q-card-actions vertical class="col-2 q-px-md">
        <q-btn flat round color="red" :icon="favoriteIcon" @click.stop="addFavorite(userMangaPlatform.manga_platform.id)"/>
        <q-btn flat round color="accent" icon="fas fa-bookmark" @click.stop="goToComicIssue">
          <q-tooltip>Resume reading</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
// import { dateFormatIso } from '@/utils/date'
// import { createNamespacedHelpers } from 'vuex'
// const storeUser = createNamespacedHelpers('user')
export default {
  name: 'FavoriteCard',
  props: {
    favoriteComicLanguage: {
      type: Object
    }
  },
  methods: {
    goToComicLanguage () {
      this.$router.push({ name: 'comic', params: { id: this.favoriteComicLanguage.comicLanguage.id } })
    },
    goToComicIssue () {
      let params = { id: this.favoriteComicLanguage.lastComicIssue.id }
      this.$router.push({ name: 'comicIssue', params: params })
    }
    // ...storeUser.mapActions({
    //   addFavorite: 'addFavorite'
    // }),
    // ...storeUser.mapGetters({
    //   getFavorite: 'getFavorite'
    // })
  },
  computed: {
    favoriteIcon () {
      return (this.favoriteComicLanguage.favorite ? 'fas' : 'far') + ' fa-heart'
    },
    lastComicIssue () {
      return this.favoriteComicLanguage.lastComicIssue
    },
    latestChapter () {
      return { number: 0 }
      // return this.userMangaPlatform.manga_platform.latest_chapter
    }
    // manga () {
    //   return this.userMangaPlatform.manga_platform.manga
    // },
    // latestChapterDate () {
    //   return dateFormatIso(this.latestChapter.date)
    // }
  }
}
</script>
