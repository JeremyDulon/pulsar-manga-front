<template>
  <div>
    <q-header v-if="navigation" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn size="lg" icon="fa fa-angle-left" color="black" @click="backToManga"  />
        <q-toolbar-title>
          <div class="text-h6">{{ currentImage+1 }}/{{ lastNumber }} {{ manga.title }} {{ chapter.number }}: {{ chapter.title }}</div>
          <span></span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-carousel v-model="currentImage"
                  animated
                  swipeable
                  fullscreen
                  :vertical="vertical"
                  :transition-next="transitionNext"
                  :transition-prev="transitionPrev"
                  ref="chapterSlider">
        <q-carousel-slide v-for="image in images"
                          :key="image.number"
                          :name="image.number"
                          :img-src="chapterImage(image.src)"
                          :draggable="false"
                          class="chapter-slide"
                          @click="navigation = !navigation"/>
        <template v-slot:control v-if="navigation">
          <q-carousel-control position="bottom" :offset="[18, 18]">
            <q-slider v-model="currentImage"
                      label
                      label-always
                      :min="firstNumber"
                      :max="lastNumber" />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-page>
  </div>
</template>
<script>
import { getChapter, getManga } from '@/utils/api'
import { CDN_BASE_URL } from '@/consts/api'
import { createNamespacedHelpers } from 'vuex'
const storeUserConfig = createNamespacedHelpers('userConfig')

export default {
  name: 'ChapterPage',
  data () {
    return {
      manga: {},
      chapter: {},
      images: [],
      currentImage: 0,
      firstNumber: null,
      lastNumber: null,
      navigation: false
    }
  },
  computed: {
    ...storeUserConfig.mapGetters({
      transitionNext: 'getTransitionNext',
      transitionPrev: 'getTransitionPrev',
      vertical: 'getVertical'
    })
  },
  async created () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        this.$refs.chapterSlider.previous()
      }
      if (e.key === 'ArrowRight') {
        this.$refs.chapterSlider.next()
      }
    })
    this.manga = await getManga(this.$route.params.mangaId)
    this.manga.chapters = this.manga.chapters.map(c => {
      return {
        id: c[3],
        title: c[2],
        number: c[0],
        date: c[1]
      }
    })
    let chapter = await getChapter(this.$route.params.id)
    this.chapter = this._.find(this.manga.chapters, (c) => c.id === this.$route.params.id)
    this.images = chapter.images.map(i => {
      return {
        number: i[0],
        src: i[1],
        h: i[2],
        w: i[3]
      }
    })
    this.firstNumber = this._.minBy(this.images, (i) => i.number).number
    this.lastNumber = this._.maxBy(this.images, (i) => i.number).number
  },
  methods: {
    chapterImage (path) {
      return CDN_BASE_URL + path
    },
    backToManga () {
      this.$router.push({ name: 'manga', params: { id: this.mangaId } })
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
