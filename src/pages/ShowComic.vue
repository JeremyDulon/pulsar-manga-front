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
                 v-if="!lightHeader && comic && comic.image"
                 :src="comic.image && comic.image.url"
                 contain style="max-height: 100px; max-width: 100px;" />
          <q-toolbar-title v-if="comic && comicLanguage">
            <q-item-label class="text-h6">{{ comic.title }}</q-item-label>
            <q-item-label v-if="!lightHeader && comicLanguage.author" class="text-subtitle2">{{ comicLanguage.author }}</q-item-label>
            <q-item-label v-if="!lightHeader && comicLanguage.views_count" class="text-subtitle2">{{ comicLanguage.views_count }} views</q-item-label>
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
          <div v-if="sortedIssues.length">
            <div class="row">
              <div class="text-subtitle2">Liste des chapitres</div>
            </div>
            <div class="row q-col-gutter-sm chapter-list">
              <div
                  v-for="issue in sortedIssues"
                  :key="issue.id"
                  @click="goToIssue(issue.id)">
                <q-card
                    :class="issueClass(issue)">
<!--                    :dark="!(stateFavorite && stateFavorite.chapter === chapter.id)"-->
                  <q-card-section>
                    <div class="col">
                      <div>Ch. {{ issue.number }}</div>
                      <i class="text-caption">{{ chapterDateDiff(issue.date) }}</i>
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
            <p class="text-faded">No issues here</p>
          </div>
        </div>
      </q-page>
      <q-dialog v-model="displayLanguageDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Change language</div>
          </q-card-section>
          <q-card-section v-if="comic && comic.comicLanguages">
            <div>
              <q-list>
                <q-item
                  v-for="(comicLanguage) in comic.comicLanguages"
                  :key="comicLanguage['@id']"
                  @click.native="changeLanguage(comicLanguage['@id'])"
                  clickable>
                  <q-item-section>
                    <q-item-label>{{ comicLanguage.language }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </keep-alive>
</template>
<script>
import { plr } from '@/utils'
import { todayDiff, dateFormatIso } from '@/utils/date'

import { show } from '@/utils/vuexer'
const { getters: comicGetters, actions: comicActions } = show('Comic')

export default {
  name: 'ShowComic',
  data () {
    return {
      loading: true,
      comicLanguage: {},
      sortDesc: true,
      lightHeader: false,
      displayLanguageDialog: false
    }
  },
  async created () {
    if (!this.$route.params.id) {
      this.goToHome()
    }
    await this.getItem({ id: this.$route.params.id })
    if (this.comic) {
      // if (this.stateFavorite && false) {
      //   let favorite = this.stateFavorite
      //   this.comicLanguage = this.comic.comicLanguages.find(platform => platform.id === favorite.id)
      // } else {
      //   let issuesByLanguagesOrdered = this._.orderBy(this.comic.comicLanguages, ['chapters', 'length'], ['desc'])
      //   this.comicLanguage = issuesByLanguagesOrdered[0]
      // }
      let favoriteLanguage = 'EN'
      if (this.comic.comicLanguages) {
        let comicLanguage = this.comic.comicLanguages.find(comicLanguage => comicLanguage.language === favoriteLanguage)
        await this.getLanguageIssues({ path: comicLanguage['@id'] })
          .then((data) => {
            this.comicLanguage = data
          })
      }
      this.loading = false
    }
  },
  methods: {
    ...comicActions,
    plr: (str, sub) => plr(str, sub),
    issueClass (issue) {
      let classes = []
      if (this.stateFavorite && this.stateFavorite.issue === issue.id) {
        classes.push('chapter-light')
      }
      return classes
    },
    toggleDisplayLanguageDialog () {
      this.displayLanguageDialog = !this.displayLanguageDialog
    },
    toggleSortOrder () {
      this.sortDesc = !this.sortDesc
    },
    changeLanguage (id) {
      this.comicLanguage = this.comic.comicLanguages.find(cl => cl['@id'] === id)
      this.displayLanguageDialog = false
    },
    goToHome () {
      this.$router.push({ name: 'home' })
    },
    goToIssue (id) {
      let params = { id: id, comic: this.comic.slug }
      // if (this.stateFavorite && this.stateFavorite.chapter === id && this.stateFavorite.page) {
      //   params.page = this.stateFavorite.page
      // }
      this.$router.push({ name: 'comicIssue', params: params })
    },
    chapterDateDiff2 (d) {
      console.warn('Probably not working')
      return todayDiff(d)
    },
    chapterDateDiff (d) {
      return dateFormatIso(d)
    }
  },
  computed: {
    comic: comicGetters.item,
    actions () {
      return [
        {
          label: 'Languages',
          icon: 'fas fa-server',
          action: () => this.toggleDisplayLanguageDialog()
        },
        {
          label: 'Sort',
          icon: this.sortIcon,
          action: () => this.toggleSortOrder()
        }
        // {
        //   label: 'Favorite',
        //   icon: this.favoriteIcon,
        //   action: () => this.addFavorite(this.comicPlatform.id)
        // }
      ]
    },
    adminActions () {
      return [
        // {
        //   label: 'AddChapters',
        //   icon: 'fas fa-book',
        //   action: () => this.toggleSourceDialog()
        // }
      ]
    },
    lastUpdate () {
      if (!this.comic) return null
      return dateFormatIso(this.comic.last_updated)
    },
    sortedIssues () {
      if (!this.comicLanguage || !this.comicLanguage.comicIssues) {
        return []
      }
      return this._.orderBy(this.comicLanguage.comicIssues, ['number'], [ this.sortDesc ? 'desc' : 'asc' ])
    },
    sortIcon () {
      return 'fas fa-' + (this.sortDesc ? 'sort-numeric-down-alt' : 'sort-numeric-down')
    },
    // favoriteIcon () {
    //   return this.stateFavorite && this.stateFavorite.favorite ? 'fas fa-heart' : 'far fa-heart'
    // },
    // stateFavorite () {
    //   return this.getFavorite()(this.comic.slug)
    // },
    latestChapter () {
      return this.sortedIssues.length ? this._.maxBy(this.sortedIssues, 'number').number : null
    }
  }
}
</script>
