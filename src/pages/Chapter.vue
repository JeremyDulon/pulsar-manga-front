<template>
  <div>
    <q-header v-if="navigation" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn
          v-go-back="{ name: 'manga', params: { slug: $route.params.manga } }"
          size="lg" icon="fa fa-angle-left" color="black" />
        <q-toolbar-title>
          <div class="text-h6">{{ currentImage }}/{{ lastNumber }} {{ chapter.number }}: {{ chapter.title }}</div>
        </q-toolbar-title>
        <q-btn icon="fa fa-cog" @click="showSettings = !showSettings" />
      </q-toolbar>
    </q-header>
    <q-page>
      <q-carousel v-model="currentImage"
                  animated
                  swipeable
                  fullscreen
                  keep-alive
                  :transition-next="trNext"
                  :transition-prev="trPrev"
                  :vertical="vertical"
                  ref="chapterSlider">
        <q-carousel-slide v-for="image in orderedImages"
                          :key="image.number"
                          :name="image.number"
                          :img-src="image.file && image.file.url"
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
    </q-page>
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
import { getChapter } from '@/utils/api'
import { createNamespacedHelpers } from 'vuex'
import UserConfig from 'pages/UserConfig'
const storeUserConfig = createNamespacedHelpers('userConfig')

export default {
  name: 'ChapterPage',
  components: { UserConfig },
  data () {
    return {
      mangaSlug: null,
      chapter: {},
      currentImage: 1,
      firstNumber: null,
      lastNumber: null,
      navigation: false,
      showSettings: false
    }
  },
  computed: {
    ...storeUserConfig.mapGetters({
      read: 'getRead',
      vertical: 'getVertical'
    }),
    orderedImages () {
      return _.orderBy(this.chapter.chapter_pages, ['number'], [
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
    if (this.$route.params.manga) {
      this.mangaSlug = this.$route.params.manga
    }
    document.addEventListener('keyup', this.handleArrows)
    this.chapter = await getChapter(this.$route.params.id)
    this.firstNumber = _.minBy(this.chapter.chapter_pages, (i) => i.number).number
    this.lastNumber = _.maxBy(this.chapter.chapter_pages, (i) => i.number).number
  },
  methods: {
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
    backToManga () {
      this.$router.push({ name: 'manga', params: { slug: this.$route.params.manga } })
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
