<template>
  <keep-alive>
    <div>
      <q-header>
        <q-toolbar class="bg-cyan-9">
          <q-btn
            icon="fa fa-chevron-left"
            flat dense
            @click="goToHome()" />
          <q-img class="col-xs-3"
                 v-if="!lightHeader && comic && comic.image"
                 :src="comic.image && comic.image.url"
                 fit="contain" style="max-height: 100px; max-width: 100px;" />
          <q-toolbar-title v-if="comic && comicLanguage">
            <q-item-label class="text-h6">{{ comic.title }}</q-item-label>
            <q-item-label class="text-subtitle2">{{ comicLanguage.language }}</q-item-label>
            <q-item-label v-if="!lightHeader && comicLanguage.author" class="text-subtitle2">{{ comicLanguage.author }}</q-item-label>
          </q-toolbar-title>
          <div class="gt-xs">
            <q-btn v-for="action in actions" :key="action.label"
                flat round dense
                :icon="action.icon" @click="action.action" />
            <q-btn v-for="action in adminActions" :key="action.label"
                 flat round dense
                 :icon="action.icon" @click="action.action" />
          </div>
          <div class="lt-sm">
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
            <div class="row q-col-gutter-sm issue-list">
              <div
                  v-for="issue in sortedIssues"
                  :key="issue.id"
                  @click="goToIssue(issue.id)">
                <q-card
                    :class="issueClass(issue)">
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
    </div>
  </keep-alive>
</template>
<script>
import { plr } from '@/utils'
import { todayDiff, dateFormatIso } from '@/utils/date'
import _ from 'lodash'

import { mapStores } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'
import { useComicStore } from '@/stores/comic'

export default {
  name: 'ShowComicLanguage',
  data () {
    return {
      comic: {},
      comicLanguage: {},
      userComicLanguage: {},
      loading: true,
      sortDesc: false,
      lightHeader: false
    }
  },
  async mounted () {
    if (!this.$route.params.id) {
      this.goBack()
    }
    await this.comicStore.doFetchComicLanguage({ id: this.$route.params.id })
    if (this.comicStore.item) {
      this.comicLanguage = this.comicStore.item
      this.comic = this.comicLanguage.comic
      this.loading = false
    }

    this.userComicLanguage = this.favoriteStore.getFavorite(this.comicLanguage)
  },
  methods: {
    plr: (str, sub) => plr(str, sub),
    issueClass (issue) {
      let classes = []
      if (this.userComicLanguage && this.userComicLanguage.lastComicIssue.id === issue.id) {
        classes.push('issue-light')
      }
      return classes
    },
    toggleSortOrder () {
      this.sortDesc = !this.sortDesc
    },
    goBack () {
      this.$router.back()
    },
    goToHome () {
      this.$router.push({ name: 'home' })
    },
    goToIssue (id) {
      let params = { id: id }
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
    ...mapStores(useComicStore, useFavoriteStore),
    actions () {
      let favoriteComic = this.favoriteStore.getFavorite(this.comicLanguage)
      let actions = [
        {
          label: 'Sort',
          icon: this.sortIcon,
          action: () => this.toggleSortOrder()
        },
        {
          label: 'Favorite',
          icon: this.favoriteIcon,
          action: () => this.favoriteStore.doUpdateFavorite({
            body: {
              comicLanguage: this.comicLanguage['@id'],
              favorite: favoriteComic ? !favoriteComic.favorite : true
            }
          })
        }
      ]

      if (favoriteComic && favoriteComic.lastComicIssue) {
        actions.push({
          label: `Resume (c: ${favoriteComic.lastComicIssue.number} - p: ${favoriteComic.lastPage})`,
          icon: 'fas fa-bookmark',
          action: () => this.goToIssue(favoriteComic.lastComicIssue.id)
        })
      }

      return actions
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
      return dateFormatIso(this.comic.lastUpdated)
    },
    sortedIssues () {
      if (!this.comicLanguage || !this.comicLanguage.comicIssues) {
        return []
      }
      return _.orderBy(this.comicLanguage.comicIssues, ['number'], [ this.sortDesc ? 'desc' : 'asc' ])
    },
    sortIcon () {
      return 'fas fa-' + (this.sortDesc ? 'sort-numeric-down-alt' : 'sort-numeric-down')
    },
    favoriteIcon () {
      let favoriteComic = this.favoriteStore.getFavorite(this.comicLanguage)
      return (favoriteComic && favoriteComic.favorite ? 'fas' : 'far') + ' fa-heart'
    },
    latestIssue () {
      return this.sortedIssues.length ? _.maxBy(this.sortedIssues, 'number').number : null
    }
  }
}
</script>
