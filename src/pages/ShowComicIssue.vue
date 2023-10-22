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
        <q-btn :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="toggleFullScreen"/>
        <q-btn v-if="comicIssueStore.nextItem && comicIssueStore.nextItem.id" icon="fa fa-forward-step" @click="goToNextComicIssue"/>
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
                            class="issue-slide"
                            @touchstart="startZoom"
                            @touchmove="moveZoom"
                            @touchend="endZoom"
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
        <q-page-sticky position="bottom-right" :offset="[ actionFloatingBtn.position.x, actionFloatingBtn.position.y ]">
          <q-fab
            v-if="showNavigation"
            icon="keyboard_arrow_left"
            direction="left"
            color="amber-5"
            v-touch-pan.prevent.mouse="dragActionFloatingBtn"
          >
            <q-fab-action square color="amber-5" v-if="comicIssueStore.nextItem && comicIssueStore.nextItem.id" icon="fa fa-forward-step" @click="goToNextComicIssue" />
            <q-fab-action square color="amber-5" :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="toggleFullScreen" />
          </q-fab>
        </q-page-sticky>
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

import { Loading, AppFullscreen, Screen } from 'quasar'
import { mapStores } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'
import { useComicIssueStore } from '@/stores/comicIssue'
import { useUserConfigStore } from '@/stores/userConfig'
import UserConfig from 'pages/UserConfig.vue'

const defaultSlideZoomProperties = {
  scale: 1,
  start: {
    x: null,
    y: null,
    distance: 0
  }
}

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
      comicLanguageId: null,
      actionFloatingBtn: {
        draggable: true,
        position: {
          x: 20,
          y: Screen.height / 2
        }
      },
      slideZoomProperties: defaultSlideZoomProperties
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
    AppFullscreen.exit()
    document.addEventListener('keyup', this.handleArrows)
  },
  async mounted () {
    document.addEventListener('keyup', this.handleArrows)
    this.doMount()
  },
  methods: {
    distanceZoom (event) {
      return Math.hypot(
        event.touches[0].pageX - event.touches[1].pageX,
        event.touches[0].pageY - event.touches[1].pageY
      )
    },
    startZoom (event) {
      if (event.touches.length === 2) {
        event.preventDefault()
        this.slideZoomProperties.start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2
        this.slideZoomProperties.start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2
        this.slideZoomProperties.start.distance = this.distanceZoom(event)
      }
    },
    moveZoom (event) {
      if (event.touches.length === 2) {
        event.preventDefault()

        let scale
        if (event.scale) {
          scale = event.scale
        } else {
          const deltaDistance = this.distanceZoom(event)
          scale = deltaDistance / this.slideZoomProperties.start.distance
        }

        this.slideZoomProperties.scale = Math.min(Math.max(1, scale), 4)
        // Calculate how much the fingers have moved on the X and Y axis
        let deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - this.slideZoomProperties.start.x) * 2 // x2 for accelarated movement
        let deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - this.slideZoomProperties.start.y) * 2 // x2 for accelarated movement

        let transformString = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${this.slideZoomProperties.scale})`
        const issueSlide = document.querySelector('.issue-slide')
        issueSlide.style.transform = transformString
        issueSlide.style.WebkitTransform = transformString
        issueSlide.style.zIndex = '9999'
      }
    },
    endZoom () {
      const issueSlide = document.querySelector('.issue-slide')
      issueSlide.style.transform = ''
      issueSlide.style.WebkitTransform = ''
      issueSlide.style.zIndex = ''
    },
    dragActionFloatingBtn (ev) {
      this.actionFloatingBtn.draggable = ev.isFirst !== true && ev.isFinal !== true

      console.log(this.actionFloatingBtn.position, ev.delta)
      this.actionFloatingBtn.position.x = this.actionFloatingBtn.position.x - ev.delta.x
      this.actionFloatingBtn.position.y = this.actionFloatingBtn.position.y - ev.delta.y
    },
    toggleFullScreen () {
      AppFullscreen.toggle()
    },
    toggleNavigation () {
      this.showNavigation = !this.showNavigation
    },
    doMount () {
      this.comicIssueStore.doFetchComicIssue({ id: this.$route.params.id })
        .then(() => {
          this.comicIssue = this.comicIssueStore.item
          this.comicLanguageId = this.comicIssue.comicLanguage.id
          this.handlePages()
          Loading.hide()
        })
        .then(() => {
          this.comicIssueStore.doFetchNextComicIssue({ id: this.$route.params.id })
        })
    },
    handlePages () {
      let page = 1
      if (this.comicIssue.comicPages.length !== 0) {
        let favorite = this.favoriteStore.getFavorite(this.comicIssue.comicLanguage)
        if (favorite && favorite.lastPage && favorite.lastComicIssue && favorite.lastComicIssue.id === this.comicIssue.id) {
          page = favorite.lastPage
        }
        this.comicPages = this.comicIssue.comicPages
        this.preloadPages()
        this.firstNumber = _.minBy(this.comicPages, (i) => i.number).number
        this.lastNumber = _.maxBy(this.comicPages, (i) => i.number).number
        this.changeSlide(page)
      }
    },
    preloadPages () {
      if (this.comicPages.length !== 0) {
        this.comicPages.forEach((page) => {
          if (page.file) {
            let img = new Image()
            img.src = page.file.url
          }
        })
      }
    },
    goToComic () {
      this.$router.push({ name: 'comic', params: { id: this.comicLanguageId } })
    },
    goToNextComicIssue () {
      Loading.show({
        message: 'Loading next issue ...'
      })
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
    }, 3000)
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
.q-page-sticky {
  z-index: 99999;
}

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
