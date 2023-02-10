<template>
  <div>
    <q-header v-if="navigation || (comicIssue && comicIssue.comicPages && !comicIssue.comicPages.length)" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn
          v-go-back="{ name: 'comic', params: { id: comic.id } }"
          size="lg" icon="fa fa-angle-left" color="black" />
        <q-toolbar-title>
          <div class="text-h6">{{ currentImage }}/{{ lastNumber }} {{ comicIssue.number }}: {{ comicIssue.title }}</div>
        </q-toolbar-title>
        <q-btn :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="$q.fullscreen.toggle()"/>
        <q-btn icon="fa fa-cog" @click="showSettings = !showSettings" />
      </q-toolbar>
    </q-header>
    <q-page>
      <q-carousel v-if="comicIssue.comicPages && comicIssue.comicPages.length" v-model="currentImage"
                  animated
                  swipeable
                  fullscreen
                  :transition-next="trNext"
                  :transition-prev="trPrev"
                  :vertical="vertical"
                  ref="chapterSlider">
        <q-carousel-slide v-for="page in orderedPages"
                          :key="page.number"
                          :name="page.number"
                          :img-src="page.file && page.file.url"
                          :draggable="false"
                          class="chapter-slide"
                          @click="navigation = !navigation"/>
        <template v-slot:control v-if="navigation">
          <q-carousel-control position="bottom" :offset="[18, 18]">
            <q-slider v-model="currentImage"
                      label
                      :label-value="currentImage"
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
    <q-dialog v-model="showSettings">
      <q-card>
        <q-card-section>
<!--          <user-config />-->
          <span>UserConfig</span>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
// import UserConfig from 'pages/UserConfig'
// const storeUserConfig = createNamespacedHelpers('userConfig')
// const storeUser = createNamespacedHelpers('user')

import { show } from '@/utils/vuexer'
const { getters: comicGetters } = show('Comic')
const { getters: comicIssueGetters, actions: comicIssueActions } = show('ComicIssue')

export default {
  name: 'ShowComicIssue',
  // components: { UserConfig },
  data () {
    return {
      currentImage: this.$route.params.page,
      firstNumber: null,
      lastNumber: 'X',
      navigation: false,
      showSettings: false,
      vertical: false,
      read: 'ltr'
    }
  },
  computed: {
    comic: comicGetters.item,
    comicIssue: comicIssueGetters.item,
    // ...storeUserConfig.mapGetters({
    //   read: 'getRead',
    //   vertical: 'getVertical'
    // }),
    orderedPages () {
      return _.orderBy(this.comicIssue.comicPages, ['number'], [
        this.read === 'ltr' || this.read === 'ud' ? 'asc' : 'desc'
      ])
    },
    trNext () {
      return this.vertical ? 'slide-up' : 'slide-left'
    },
    trPrev () {
      return this.vertical ? 'slide-down' : 'slide-right'
    }
  },
  destroyed () {
    document.addEventListener('keyup', this.handleArrows)
  },
  async created () {
    document.addEventListener('keyup', this.handleArrows)
    await this.getComicIssue({ id: this.$route.params.id })
    // this.chapter = await getComicIssue(this)
    if (!this.$route.params.page) {
      this.currentImage = 1
    }
    if (this.comicIssue && this.comicIssue.comicPages.length) {
      this.firstNumber = _.minBy(this.comicIssue.comicPages, (i) => i.number).number
      this.lastNumber = _.maxBy(this.comicIssue.comicPages, (i) => i.number).number
    }
  },
  methods: {
    getComicIssue: comicIssueActions.getItem,
    // ...storeUser.mapActions({
    //   readPage: 'readPage'
    // }),
    handleArrows (e) {
      const key = e.key
      if (
        (this.vertical && key === 'ArrowUp' && this.read === 'ud') ||
        (this.vertical && key === 'ArrowDown' && this.read === 'du') ||
        (!this.vertical && key === 'ArrowLeft' && this.read === 'ltr') ||
        (!this.vertical && key === 'ArrowRight' && this.read === 'rtl')
      ) { this.goToPrev() }

      if (
        (this.vertical && key === 'ArrowUp' && this.read === 'du') ||
        (this.vertical && key === 'ArrowDown' && this.read === 'ud') ||
        (!this.vertical && key === 'ArrowLeft' && this.read === 'rtl') ||
        (!this.vertical && key === 'ArrowRight' && this.read === 'ltr')
      ) { this.goToNext() }
    },
    goToPrev () {
      this.currentImage = this.currentImage === this.firstNumber ? this.currentImage : this.currentImage - 1
    },
    goToNext () {
      this.currentImage = this.currentImage === this.lastNumber ? this.currentImage : this.currentImage + 1
    },
    updateReadPage: _.debounce(async function (pageNumber) {
      // await this.readPage({
      //   issue: this.issue.id,
      //   page: pageNumber
      // })
    }, 1000)
  },
  watch: {
    currentImage: {
      handler: function (newVal) {
        this.updateReadPage(newVal)
      }
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
</style>
