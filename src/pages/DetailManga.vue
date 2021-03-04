<template>
  <keep-alive>
    <div>
      <q-header>
        <q-toolbar class="bg-cyan-9">
          <q-btn
            icon="fa fa-chevron-left"
            flat dense
            v-go-back="{name: 'home'}" />
          <q-img class="col-xs-3"
                 v-if="!lightHeader"
                 :src="manga.image && manga.image.url"
                 contain style="max-height: 100px; max-width: 100px;" />
          <q-toolbar-title>
            <q-item-label class="text-h6">{{ manga.title }}</q-item-label>
            <q-item-label v-if="!lightHeader && mangaPlatform.author" class="text-subtitle2">{{ mangaPlatform.author }}</q-item-label>
            <q-item-label v-if="!lightHeader && mangaPlatform.views_count" class="text-subtitle2">{{ mangaPlatform.views_count }} views</q-item-label>
          </q-toolbar-title>
          <div class="gt-sm">
            <q-btn v-for="action in actions" :key="action.label"
                flat round dense
                :icon="action.icon" @click="action.action" />
            <q-btn v-for="action in adminActions" :key="action.label"
                 flat round dense
                 :icon="action.icon" @click="action.action" />
          </div>
          <div class="lt-md">
            <q-btn flat round dense icon="fas fa-bars">
              <q-menu>
                <q-list>
                  <q-item v-for="action in actions" :key="action.label"
                          @click="action.action"
                          clickable v-close-popup>
                    <q-item-section>{{ action.label }}</q-item-section>
                    <q-item-section avatar>
                      <q-icon :name="action.icon" />
                    </q-item-section>
                  </q-item>
                  <div v-if="true">
                    <q-separator />
                    <q-item v-for="action in adminActions" :key="action.label"
                            @click="action.action"
                            clickable v-close-popup>
                      <q-item-section>{{ action.label }}</q-item-section>
                      <q-item-section avatar>
                        <q-icon :name="action.icon" />
                      </q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <q-page padding>
        <q-inner-loading :showing="loading">
          <q-spinner-ball size="30%" color="secondary" />
        </q-inner-loading>
        <div v-if="!loading">
          <div v-if="sortedChapters.length">
            <div class="row">
              <div class="text-subtitle2">Liste des chapitres</div>
            </div>
            <div class="row q-col-gutter-sm chapter-list">
              <div
                  v-for="chapter in sortedChapters"
                  :key="chapter.id"
                  @click="goToChapter(chapter.id)">
                <q-card
                    :class="chapterClass(chapter)"
                    :dark="!(stateFavorite && stateFavorite.chapter === chapter.id)">
                  <q-card-section>
                    <div class="col">
                      <div>Ch. {{ chapter.number }}</div>
                      <i class="text-caption">{{ chapterDateDiff(chapter.date) }}</i>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
          <div class="fixed-center text-center" v-else>
            <p>
              <img
                  src="~assets/sad.svg"
                  alt="Sad"
                  style="width:30vw;max-width:150px;"
              >
            </p>
            <p class="text-faded">No chapters here</p>
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
      <dialog-add-source v-model="addSourceDialog"
                         :chapter="latestChapter"
                         :url="mangaPlatform.source_url"
      />
    </div>
  </keep-alive>
</template>
<script>
import { getManga } from '@/utils/api'
import { todayDiff, dateFormatIso } from '@/utils/date'
import { createNamespacedHelpers } from 'vuex'
import DialogAddSource from 'components/dialog/DialogAddSource'
const storeUser = createNamespacedHelpers('user')

export default {
  name: 'DetailManga',
  components: { DialogAddSource },
  data () {
    let self = this
    return {
      mangaSlug: self.$route.params.slug,
      manga: {
        platforms: []
      },
      loading: true,
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
      this.mangaPlatform = this.manga.platforms.find(platform => platform.id === favorite.id)
    } else {
      let platformsByChLength = this._.orderBy(this.manga.platforms, ['length'], ['desc'])
      this.mangaPlatform = platformsByChLength[0]
    }
    this.loading = false
  },
  methods: {
    chapterClass (chapter) {
      let classes = []
      if (this.stateFavorite && this.stateFavorite.chapter === chapter.id) {
        classes.push('chapter-light')
      }
      return classes
    },
    togglePlatformDialog () {
      this.selectPlatformDialog = !this.selectPlatformDialog
    },
    toggleSortOrder () {
      this.sortDesc = !this.sortDesc
    },
    toggleSourceDialog () {
      this.addSourceDialog = !this.addSourceDialog
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
    actions () {
      return [
        {
          label: 'Platforms',
          icon: 'fas fa-server',
          action: () => this.togglePlatformDialog()
        },
        {
          label: 'Sort',
          icon: this.sortIcon,
          action: () => this.toggleSortOrder()
        },
        {
          label: 'Favorite',
          icon: this.favoriteIcon,
          action: () => this.addFavorite(this.mangaPlatform.id)
        }
      ]
    },
    adminActions () {
      return [
        {
          label: 'AddChapters',
          icon: 'fas fa-book',
          action: () => this.toggleSourceDialog()
        }
      ]
    },
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
    },
    latestChapter () {
      return this.sortedChapters.length ? this._.maxBy(this.sortedChapters, 'number').number : null
    }
  }
}
</script>
