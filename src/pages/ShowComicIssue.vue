<template>
  <div>
    <q-header v-if="showNavigation || comicPages.length === 0" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn
          @click="goToComic"
          size="lg" icon="fa fa-angle-left" color="black" />
        <q-toolbar-title v-if="comicIssue">
          <div class="text-h6">{{ currentPage }}/{{ lastNumber }} {{ comicIssue.number }}: {{ comicIssue.title }}</div>
        </q-toolbar-title>
        <q-btn :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="$q.fullscreen.toggle()"/>
        <q-btn icon="fa fa-forward-step" @click="goToNextComicIssue"/>
        <q-btn icon="fa fa-cog" @click="showSettings = !showSettings" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-carousel v-if="comicPages.length !== 0" v-model="currentSlideName"
                    animated
                    swipeable
                    fullscreen
                    no-route-fullscreen-exit
                    :transition-next="trNext"
                    :transition-prev="trPrev"
                    :vertical="userConfigStore.readMode === 'ttb'"
                    ref="chapterSlider">
          <q-carousel-slide v-for="page in orderedPages"
                            :key="page.id"
                            :name="page.id"
                            :img-src="page.file && page.file.url"
                            :draggable="false"
                            class="chapter-slide"
                            @click="toggleNavigation" />
          <template v-slot:control v-if="showNavigation">
            <q-carousel-control position="bottom" :offset="[0,0]" class="pulsar-slider">
              <q-slider v-model="currentPage"
                        label
                        :label-value="currentPage"
                        label-always
                        :min="firstNumber"
                        :max="lastNumber" />
            </q-carousel-control>
          </template>
        </q-carousel>
        <q-responsive v-else class="col" :ratio="1" style="max-height: 100%">
          <div class="flex flex-center items-center">
            <div class="">
              <q-icon name="far fa-sad-tear" :size="'100px'" color="grey-4"/>
            </div>
          </div>
        </q-responsive>
      </q-page>
    </q-page-container>
    <q-dialog v-model="showSettings">
      <q-card>
        <q-card-section>
          <user-config />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import _ from 'lodash'

import { mapStores } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'
import { useComicIssueStore } from '@/stores/comicIssue'
import { useUserConfigStore } from '@/stores/userConfig'
import UserConfig from 'pages/UserConfig.vue'

export default {
  name: 'ShowComicIssue',
  components: { UserConfig },
  data () {
    return {
      currentSlideName: null,
      firstNumber: null,
      lastNumber: null,
      showNavigation: false,
      showSettings: false,
      comicIssue: null,
      comicPages: [],
      comicLanguageId: null
    }
  },
  computed: {
    ...mapStores(useComicIssueStore, useFavoriteStore, useUserConfigStore),
    orderedPages () {
      return _.orderBy(this.comicPages, ['number'], [
        this.userConfigStore.readMode === 'ltr' || this.userConfigStore.readMode === 'ttb' ? 'asc' : 'desc'
      ])
    },
    trNext () {
      return this.userConfigStore.readMode === 'ttb' ? 'slide-up' : 'slide-left'
    },
    trPrev () {
      return this.userConfigStore.readMode === 'ttb' ? 'slide-down' : 'slide-right'
    },
    currentPage () {
      return this.currentSlideName !== null ? this.comicPages.find((page) => page.id === this.currentSlideName).number : 1
    }
  },
  unmounted () {
    document.addEventListener('keyup', this.handleArrows)
  },
  async mounted () {
    document.addEventListener('keyup', this.handleArrows)
    this.doMount()
  },
  methods: {
    toggleNavigation (e) {
      console.log(e)
      this.showNavigation = !this.showNavigation
    },
    doMount () {
      this.comicIssueStore.doFetchComicIssue({ id: this.$route.params.id })
        .then(() => {
          let page = 1
          this.comicIssue = this.comicIssueStore.item
          this.comicLanguageId = this.comicIssue.comicLanguage.id
          if (this.comicIssue.comicPages.length !== 0) {
            let favorite = this.favoriteStore.getFavorite(this.comicIssue.comicLanguage)
            if (favorite && favorite.lastPage && favorite.lastComicIssue && favorite.lastComicIssue.id === this.comicIssue.id) {
              page = favorite.lastPage
            }
            this.comicPages = this.comicIssue.comicPages
            this.firstNumber = _.minBy(this.comicPages, (i) => i.number).number
            this.lastNumber = _.maxBy(this.comicPages, (i) => i.number).number
            this.changeSlide(page)
          }
        })
        .then(() => {
          this.comicIssueStore.doFetchNextComicIssue({ id: this.$route.params.id })
        })
    },
    goToComic () {
      this.$router.push({ name: 'comic', params: { id: this.comicLanguageId } })
    },
    goToNextComicIssue () {
      this.$router.push({ name: 'comicIssue', params: { id: this.comicIssueStore.nextItem.id } })
    },
    handleArrows (e) {
      const key = e.key
      switch (key) {
        case 'ArrowUp':
          this.goToPrev()
          break
        case 'ArrowDown':
          this.goToNext()
          break
        case 'ArrowLeft':
          this.userConfigStore.readMode === 'rtl' ? this.goToNext() : this.goToPrev()
          break
        case 'ArrowRight':
          this.userConfigStore.readMode === 'rtl' ? this.goToPrev() : this.goToNext()
          break
      }
    },
    changeSlide (newPage) {
      let comicPage = this.comicPages.find((page) => page.number === newPage)
      if (comicPage) {
        this.currentSlideName = comicPage.id
      }
    },
    goToPrev () {
      let page = this.currentPage === this.firstNumber ? this.currentPage : this.currentPage - 1
      this.changeSlide(page)
    },
    goToNext () {
      let page = this.currentPage === this.lastNumber ? this.currentPage : this.currentPage + 1
      this.changeSlide(page)
    },
    updateReadPage: _.debounce(async function (pageNumber) {
      this.favoriteStore.doUpdateFavorite({
        body: {
          comicLanguage: this.comicIssue.comicLanguage['@id'],
          lastComicIssue: this.comicIssue['@id'],
          lastPage: pageNumber
        }
      })
    }, 1000)
  },
  watch: {
    currentPage: {
      handler: function (newVal) {
        this.updateReadPage(newVal)
      }
    },
    '$route': {
      handler: function () {
        this.doMount()
      },
      deep: true
    }
  }
}
</script>

<style>
.chapter-slide {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
  background-position-y: center;
  background-color: #111111;
}

.pulsar-slider {
  background-color: black;
  padding: 18px;
}
</style>
