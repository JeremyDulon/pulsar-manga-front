<template>
  <div>
    <q-header v-if="showNavigation || comicPages.length === 0" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn
          @click="goToComic"
          size="lg" icon="fa fa-angle-left" color="black" />
        <q-toolbar-title v-if="comicIssue">
          <div class="text-h6">{{ currentPageNumber }}/{{ lastPageNumber }} {{ comicIssue.number }}: {{ comicIssue.title }}</div>
        </q-toolbar-title>
        <q-btn :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="toggleFullScreen"/>
        <q-btn v-if="comicIssueStore.nextItem && comicIssueStore.nextItem.id" icon="fa fa-forward-step" @click="goToNextComicIssue"/>
        <q-btn icon="fa fa-cog" @click="showSettings = !showSettings" />
      </q-toolbar>
      <q-toolbar inset>
        <q-chip v-if="commonInfo.batteryLevel" icon="fa fa-battery-full">{{ commonInfo.batteryLevel }}%</q-chip>
        <q-chip v-if="commonInfo.currentTime" icon="fa fa-clock">{{ commonInfo.currentTime }}</q-chip>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-carousel v-if="comicPages.length !== 0" v-model="currentSlideName"
                    @update:model-value="updateSliderPageNumber"
                    animated
                    :swipeable="carouselSwipeable"
                    fullscreen
                    no-route-fullscreen-exit
                    :transition-next="trNext"
                    :transition-prev="trPrev"
                    :vertical="userConfigStore.readMode === 'ttb'"
                    ref="issueSlider">
          <q-carousel-slide v-for="page in orderedPages"
                            :key="page.id"
                            :name="page.id"
                            :img-src="page.file && page.file.url"
                            :draggable="false"
                            class="issue-slide"
                            @touchstart="handleTouchStart"
                            @touchmove="handleTouchMove"
                            @click="handleClick" />
          <template v-slot:control v-if="showNavigation">
            <q-carousel-control position="bottom" :offset="[0,0]" class="pulsar-slider">
              <q-slider v-model="sliderPageNumber"
                        label
                        :label-value="sliderPageNumber"
                        label-always
                        :min="firstPageNumber"
                        :max="lastPageNumber" />
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
        <q-page-sticky position="top-left" v-if="debugMode">
          <q-card>
            <q-card-section>
              <p>clickCounter: {{ clickCounter }}</p>
              <p>zoomModeEnabled: {{ zoomModeEnabled ? 'true' : 'false' }}</p>
              <p>slideZoomProperties: {{ slideZoomProperties }}</p>
              <p>issueSlideStyle: {{ issueSlideStyle }}</p>
              <p>carouselSwipeable: {{ carouselSwipeable }}</p>
            </q-card-section>
          </q-card>
        </q-page-sticky>
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
            <q-fab-action square color="amber-5" :icon="'fa fa-cog'" @click="toggleDebugMode" />
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
import { toast } from '@/utils/ui'

const defaultSlideZoomProperties = {
  scale: 1,
  start: {
    x: null,
    y: null,
    distance: 0
  },
  position: {
    x: null,
    y: null
  }
}

export default {
  name: 'ShowComicIssue',
  components: { UserConfig },
  data () {
    return {
      debugMode: false,
      carouselSwipeable: true,
      currentSlideName: null,
      firstPageNumber: null,
      lastPageNumber: null,
      sliderPageNumber: null,
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
      clickCounter: 0,
      timer: null,
      zoomModeEnabled: false,
      slideZoomProperties: defaultSlideZoomProperties,
      issueSlideStyle: '',
      commonInfo: {
        batteryLevel: null,
        currentTime: null
      },
      fullscreenEnabled: false
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
    currentPageNumber () {
      return this.currentSlideName !== null ? this.comicPages.find((page) => page.id === this.currentSlideName).number : 1
    }
  },
  unmounted () {
    AppFullscreen.exit()
    document.removeEventListener('keyup', this.handleArrows)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  },
  async mounted () {
    document.addEventListener('keyup', this.handleArrows)
    this.doMount()
    navigator.getBattery().then((battery) => {
      this.commonInfo.batteryLevel = (battery.level * 100).toFixed(0)
      battery.onlevelchange = () => {
        this.commonInfo.batteryLevel = (battery.level * 100).toFixed(0)
      }
    })
    setInterval(() => this.updateCurrentTime())

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  methods: {
    distanceZoom (event) {
      return Math.hypot(
        event.touches[0].pageX - event.touches[1].pageX,
        event.touches[0].pageY - event.touches[1].pageY
      )
    },
    handleTouchStart (event) {
      if (event.touches.length === 2 && this.zoomModeEnabled === false) {
        event.preventDefault()

        this.slideZoomProperties.start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2
        this.slideZoomProperties.start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2
        this.slideZoomProperties.start.distance = this.distanceZoom(event)
      }
    },
    handleTouchMove (event) {
      if (event.touches.length === 1 && this.zoomModeEnabled === true) {
        this.carouselSwipeable = false
      }

      if (event.touches.length === 2) {
        event.preventDefault()

        let scale
        if (event.scale) {
          scale = event.scale
        } else {
          scale = this.distanceZoom(event) / this.slideZoomProperties.start.distance
        }

        this.slideZoomProperties.scale = Math.min(Math.max(1, scale), 4)
        // Calculate how much the fingers have moved on the X and Y axis
        let deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - this.slideZoomProperties.start.x) * 2 // x2 for accelarated movement
        let deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - this.slideZoomProperties.start.y) * 2 // x2 for accelarated movement

        this.updateZoom(deltaX, deltaY)
      }
    },
    updateZoom (deltaX = 0, deltaY = 0) {
      const issueSlide = document.querySelector('.issue-slide')

      if (this.slideZoomProperties.scale > 1) {
        let transformString = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${this.slideZoomProperties.scale})`

        issueSlide.style.transform = transformString
        issueSlide.style.WebkitTransform = transformString
        issueSlide.style.zIndex = '9999'
        this.zoomModeEnabled = true
      } else {
        issueSlide.style.transform = ''
        issueSlide.style.WebkitTransform = ''
        issueSlide.style.zIndex = ''
        this.zoomModeEnabled = false
      }

      this.issueSlideStyle = issueSlide.style.transform
    },
    dragActionFloatingBtn (ev) {
      this.actionFloatingBtn.draggable = ev.isFirst !== true && ev.isFinal !== true

      console.log(this.actionFloatingBtn.position, ev.delta)
      this.actionFloatingBtn.position.x = this.actionFloatingBtn.position.x - ev.delta.x
      this.actionFloatingBtn.position.y = this.actionFloatingBtn.position.y - ev.delta.y
    },
    toggleFullScreen () {
      this.fullscreenEnabled = !this.fullscreenEnabled
      AppFullscreen.toggle()
    },
    toggleDebugMode () {
      this.debugMode = !this.debugMode
    },
    handleClick (event) {
      this.clickCounter++
      this.currentEvent = event

      if (!this.timer) {
        this.timer = setTimeout(() => {
          if (this.clickCounter === 1) {
            this.showNavigation = !this.showNavigation
          }

          if (this.clickCounter === 2) {
            let deltaX, deltaY
            if (this.slideZoomProperties.scale === 1) {
              deltaX = (window.innerWidth / 2) - this.currentEvent.x
              deltaY = (window.innerHeight / 2) - this.currentEvent.y
              this.slideZoomProperties.scale = 2
            } else {
              this.slideZoomProperties.scale = 1
            }

            this.updateZoom(deltaX, deltaY)
          }

          this.clickCounter = 0
          clearTimeout(this.timer)
          this.timer = null
        }, 200)
      }
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
        this.firstPageNumber = _.minBy(this.comicPages, (i) => i.number).number
        this.lastPageNumber = _.maxBy(this.comicPages, (i) => i.number).number
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
    handleVisibilityChange () {
      if (document.visibilityState === 'visible' && this.fullscreenEnabled === true) {
        AppFullscreen.request()
      }
    },
    changeSlide (newPage) {
      let comicPage = this.comicPages.find((page) => page.number === newPage)
      if (comicPage) {
        this.currentSlideName = comicPage.id
        this.sliderPageNumber = newPage
      }
    },
    updateSliderPageNumber (newVal) {
      let comicPage = this.comicPages.find((page) => page.id === newVal)
      if (comicPage) {
        this.sliderPageNumber = comicPage.number
      }
    },
    goToPrev () {
      let page = this.currentPageNumber === this.firstPageNumber ? this.currentPageNumber : this.currentPageNumber - 1
      this.changeSlide(page)
    },
    goToNext () {
      let page = this.currentPageNumber === this.lastPageNumber ? this.currentPageNumber : this.currentPageNumber + 1
      this.changeSlide(page)
    },
    updateCurrentTime () {
      let today = new Date()
      let hours = today.getHours() <= 9 ? '0' + today.getHours() : today.getHours()
      let minutes = today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes()
      this.commonInfo.currentTime = hours + ':' + minutes
    },
    updateReadPage: _.debounce(async function (pageNumber) {
      if (this.currentPageNumber === this.lastPageNumber && this.comicIssueStore.nextItem !== null) {
        toast.info({ message: 'Last page reached.', timeout: 200 })
        this.goToNextComicIssue()
      } else {
        this.favoriteStore.doUpdateFavorite({
          body: {
            comicLanguage: this.comicIssue.comicLanguage['@id'],
            lastComicIssue: this.comicIssue['@id'],
            lastPage: pageNumber
          }
        })
      }
    }, 1500)
  },
  watch: {
    currentPageNumber: {
      handler: function (newVal) {
        this.updateReadPage(newVal)
      }
    },
    sliderPageNumber: {
      handler: function (newVal) {
        this.changeSlide(newVal)
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

.issue-slide {
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
