<template>
  <div>
    <q-header v-if="navigation || comicPages.length === 0" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn
          v-go-back="{ name: 'comic', params: { id: comicLanguageId } }"
          size="lg" icon="fa fa-angle-left" color="black" />
        <q-toolbar-title>
          <div class="text-h6">{{ currentPage }}/{{ lastNumber }} {{ comicIssue.number }}: {{ comicIssue.title }}</div>
        </q-toolbar-title>
        <q-btn :icon="'fa ' + ($q.fullscreen.isActive ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt')" @click="$q.fullscreen.toggle()"/>
        <q-btn icon="fa fa-cog" @click="showSettings = !showSettings" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-carousel v-if="comicPages.length !== 0" v-model="currentSlideName"
                    animated
                    swipeable
                    fullscreen
                    :transition-next="trNext"
                    :transition-prev="trPrev"
                    :vertical="readMode === 'ttb'"
                    ref="chapterSlider">
          <q-carousel-slide v-for="page in orderedPages"
                            :key="page.id"
                            :name="page.id"
                            :img-src="page.file && page.file.url"
                            :draggable="false"
                            class="chapter-slide"
                            @click="navigation = !navigation"/>
          <template v-slot:control v-if="navigation">
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
<!--          <user-config />-->
          <span>UserConfig</span>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
// import { createNamespacedHelpers } from 'vuex'
// import UserConfig from 'pages/UserConfig'
// const storeUserConfig = createNamespacedHelpers('userConfig')
// const storeUser = createNamespacedHelpers('user')

export default {
  name: 'ShowComicIssue',
  data () {
    return {
      currentSlideName: null,
      firstNumber: null,
      lastNumber: null,
      navigation: false,
      showSettings: false,
      readMode: 'ltr',
      comicPages: [],
      comicLanguageId: null
    }
  },
  computed: {
    ...mapGetters({
      comicIssue: 'comic/comicLanguage/comicIssue/item',
      userComicLanguage: 'user/comicLanguage/item'
    }),
    orderedPages () {
      return _.orderBy(this.comicPages, ['number'], [
        this.readMode === 'ltr' || this.readMode === 'ttb' ? 'asc' : 'desc'
      ])
    },
    trNext () {
      return this.readMode === 'ttb' ? 'slide-up' : 'slide-left'
    },
    trPrev () {
      return this.readMode === 'ttb' ? 'slide-down' : 'slide-right'
    },
    currentPage () {
      return this.currentSlideName !== null ? this.comicPages.find((page) => page.id === this.currentSlideName).number : 1
    }
  },
  destroyed () {
    document.addEventListener('keyup', this.handleArrows)
  },
  async created () {
    document.addEventListener('keyup', this.handleArrows)
    await this.getComicIssue({ id: this.$route.params.id })
      .then(() => {
        let page = 1
        this.comicLanguageId = this.comicIssue.comicLanguage.id
        this.updateFavorite(this.comicIssue.comicLanguage['@id'])
        if (this.comicIssue.comicPages.length !== 0) {
          if (this.userComicLanguage.lastComicIssue === this.comicIssue['@id'] && this.userComicLanguage.lastPage) {
            page = this.userComicLanguage.lastPage
          }
          this.comicPages = this.comicIssue.comicPages
          this.changeSlide(page)
          this.firstNumber = _.minBy(this.comicPages, (i) => i.number).number
          this.lastNumber = _.maxBy(this.comicPages, (i) => i.number).number
        }
      })
  },
  methods: {
    ...mapMutations({
      updateFavorite: 'user/comicLanguage/showSetItem'
    }),
    ...mapActions({
      getComicIssue: 'comic/comicLanguage/comicIssue/getItem',
      setFavorite: 'user/comicLanguage/setUserFavorite'
    }),
    // ...storeUser.mapActions({
    //   readPage: 'readPage'
    // }),
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
          this.readMode === 'rtl' ? this.goToNext() : this.goToPrev()
          break
        case 'ArrowRight':
          this.readMode === 'rtl' ? this.goToPrev() : this.goToNext()
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
      await this.setFavorite({
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
