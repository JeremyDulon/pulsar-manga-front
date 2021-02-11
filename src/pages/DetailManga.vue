<template>
  <keep-alive>
    <div>
      <q-header reveal @reveal="reveal">
        <q-toolbar class="bg-cyan-9">
          <q-btn
            icon="fa fa-chevron-left"
            flat dense
            v-go-back="{name: 'home'}" />
          <q-img class="col-xs-3" :src="manga.image && manga.image.url" contain style="max-height: 100px; max-width: 100px;" />
          <q-toolbar-title>
            <q-item-label class="text-h6">{{ manga.title }}</q-item-label>
            <q-item-label class="text-subtitle2">{{ mangaPlatform.author }}</q-item-label>
            <q-item-label class="text-subtitle2">{{ mangaPlatform.views_count }} views</q-item-label>
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-server" @click="selectPlatformDialog = !selectPlatformDialog"/>
          <q-btn flat round dense :icon="sortIcon" @click="sortDesc = !sortDesc" />
          <!-- TODO: Add favorite (to user) -->
          <q-btn flat round dense :icon="favoriteIcon" @click="addFavorite(mangaPlatform.id)" />
        </q-toolbar>
      </q-header>
      <q-header v-if="lightHeader">
        <q-toolbar class="bg-cyan-9">
          <q-btn
            icon="fa fa-chevron-left"
            flat dense
            v-go-back="{name: 'home'}" />
          <q-toolbar-title>
            <q-item-label class="text-h6">{{ manga.title }}</q-item-label>
          </q-toolbar-title>
          <q-btn flat round dense :icon="sortIcon" @click="sortDesc = !sortDesc" />
          <!-- TODO: Add favorite (to user) -->
          <q-btn flat round dense :icon="favoriteIcon" @click="addFavorite(manga.slug)" />
        </q-toolbar>
      </q-header>
      <q-page padding>
        <div class="row">
          <div class="text-subtitle2">Liste des chapitres</div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-3 col-sm-2 col-lg-1" v-for="chapter in sortedChapters" :key="chapter.id" @click="goToChapter(chapter.id)">
            <q-card :dark="stateFavorite && stateFavorite.chapter === chapter.id">
              <q-card-section>
                <div class="col">
                  <div>Ch. {{ chapter.number }}</div>
                  <i class="text-caption">{{ chapterDateDiff(chapter.date) }}</i>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
      <q-dialog v-model="selectPlatformDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Change platform</div>
          </q-card-section>
          <q-card-section>
            <div>
              <q-list>
                <q-item
                  v-for="(mp, id) in manga.platforms"
                  :key="mp.id"
                  @click.native="changePlatform(id)"
                  clickable>
                  <q-item-section>
                    <q-item-label>{{ mp.platform.name }} ({{ mp.platform.language }})</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="addSourceDialog">
        <q-card>
          <q-card-section>
            <form-source :url="mangaPlatform.source_url" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </keep-alive>
</template>
<script>
import { getManga } from '@/utils/api'
import { todayDiff, dateFormatIso } from '@/utils/date'
import { createNamespacedHelpers } from 'vuex'
import FormSource from 'components/forms/FormSource'
const storeUser = createNamespacedHelpers('user')

export default {
  name: 'DetailManga',
  components: { FormSource },
  data () {
    let self = this
    return {
      mangaSlug: self.$route.params.slug,
      manga: {},
      mangaPlatform: {},
      sortDesc: true,
      lightHeader: false,
      selectPlatformDialog: false,
      addSourceDialog: false
    }
  },
  async created () {
    if (!this.mangaSlug) {
      this.goToHome()
    }
    this.manga = await getManga(this.mangaSlug)
    if (this.stateFavorite) {
      let favorite = this.stateFavorite
      this.mangaPlatform = this.manga.platforms.find(platform => platform.platform.id === favorite.id)
    } else {
      this.mangaPlatform = this.manga.platforms[0]
    }
  },
  methods: {
    reveal (val) {
      this.lightHeader = !val
    },
    changePlatform (id) {
      this.mangaPlatform = this.manga.platforms[id]
      this.selectPlatformDialog = false
    },
    goToHome () {
      this.$router.push({ name: 'home' })
    },
    goToChapter (id) {
      let params = { id: id, manga: this.manga.slug }
      if (this.stateFavorite && this.stateFavorite.chapter === id && this.stateFavorite.page) {
        params.page = this.stateFavorite.page
      }
      this.$router.push({ name: 'chapter', params: params })
    },
    chapterDateDiff2 (d) {
      return todayDiff(d)
    },
    chapterDateDiff (d) {
      return dateFormatIso(d)
    },
    ...storeUser.mapActions({
      addFavorite: 'addFavorite'
    }),
    ...storeUser.mapGetters({
      getFavorite: 'getFavorite'
    })
  },
  computed: {
    lastUpdate () {
      return dateFormatIso(this.manga.last_updated)
    },
    sortedChapters () {
      return this._.orderBy(this.mangaPlatform.chapters, ['number'], [ this.sortDesc ? 'desc' : 'asc' ])
    },
    sortIcon () {
      return 'fas fa-' + (this.sortDesc ? 'sort-numeric-down-alt' : 'sort-numeric-down')
    },
    favoriteIcon () {
      return this.stateFavorite && this.stateFavorite.favorite ? 'fas fa-heart' : 'far fa-heart'
    },
    stateFavorite () {
      return this.getFavorite()(this.manga.slug)
    }
  }
}
</script>

<style scoped>
.q-card__section {
  padding: 8px 16px;
}
</style>
