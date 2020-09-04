<template>
  <keep-alive>
    <div>
      <q-header>
        <q-toolbar class="bg-cyan-9">
          <q-card flat class="bg-cyan-9">
            <q-card-section horizontal class="no-padding">
               <q-btn size="lg" icon="fa fa-angle-left" @click="goToHome" />
              <q-img class="col-xs-3" :src="manga.image && manga.image.url" contain style="max-height: 100px; max-width: 100px;" />
              <q-card-section>
                <q-toolbar-title>
                  <strong>{{ manga.title }}</strong>
                </q-toolbar-title>
                <q-btn flat round dense :icon="sortIcon" @click="sortDesc = !sortDesc" />
                <!-- TODO: Add favorite (to user) -->
                <q-btn flat round dense :icon="faroviteIcon" @click="addFavorite(manga)" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-toolbar>
      </q-header>
      <q-page padding>
        <div class="row">
          <div class="text-h6">Liste des chapitres</div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-4 col-md-3" v-for="chapter in sortedChapters" :key="chapter.id" @click="goToChapter(chapter.id)">
            <q-card>
              <q-card-section>
                <div class="col text-center">
                  <div>{{ chapter.number }}</div>
                  <i>{{ chapterDateDiff(chapter.date) }}</i>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </div>
  </keep-alive>
</template>
<script>
import { getManga } from '@/utils/api'
import { todayDiff, dateFormatIso } from '@/utils/date'
import { createNamespacedHelpers } from 'vuex'
const storeFavorites = createNamespacedHelpers('favorites')

export default {
  name: 'DetailManga',
  data () {
    let self = this
    return {
      mangaSlug: self.$route.params.slug,
      manga: {},
      chapters: [],
      sortDesc: true
    }
  },
  async created () {
    this.manga = await getManga(this.mangaSlug)
    this.chapters = this.manga.chapters
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'home' })
    },

    goToChapter (id) {
      this.$router.push({ name: 'chapter', params: { id: id, manga: this.manga.slug } })
    },
    chapterDateDiff2 (d) {
      return todayDiff(d)
    },
    chapterDateDiff (d) {
      return dateFormatIso(d)
    },
    ...storeFavorites.mapMutations({
      addFavorite: 'addFavorite'
    }),
    ...storeFavorites.mapGetters(['getFavorite'])
  },
  computed: {
    lastUpdate () {
      return dateFormatIso(this.manga.last_updated)
    },
    sortedChapters () {
      return this._.orderBy(this.chapters, ['number'], [ this.sortDesc ? 'desc' : 'asc' ])
    },
    sortIcon () {
      return 'fas fa-' + (this.sortDesc ? 'sort-numeric-down-alt' : 'sort-numeric-down')
    },
    faroviteIcon () {
      return this.getFavorite()(this.manga.id) ? 'fas fa-heart' : 'far fa-heart'
    }
  }
}
</script>

<style scoped>
  .q-card__section {
    padding: 8px 16px;
  }
</style>
