<template>
  <q-page>
    <q-carousel v-model="currentImage"
                animated
                swipeable
                fullscreen
                ref="chapter">
      <q-carousel-slide v-for="image in images"
                        :key="image.number"
                        :name="image.number"
                        :img-src="chapterImage(image.src)"
                        :draggable="false"
                        class="chapter-slide"
                        @click="navigation = !navigation"/>
      <template v-slot:control v-if="navigation">
        <q-carousel-control position="bottom" :offset="[18, 18]">
          <q-slider v-model="currentImage" :min="firstNumber" :max="lastNumber"></q-slider>
        </q-carousel-control>
      </template>
    </q-carousel>
    <q-page-sticky v-if="navigation" position="top-left" :offset="[18, 18]" style="z-index: 6001;">
      <q-btn fab icon="fa fa-angle-left" color="black" @click="backToManga"  />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { getChapter } from '@/utils/api'
import { CDN_BASE_URL } from '@/consts/api'

export default {
  name: 'ChapterPage',
  data () {
    return {
      mangaId: null,
      chapter: {},
      images: [],
      currentImage: 0,
      firstNumber: null,
      lastNumber: null,
      navigation: false
    }
  },
  async created () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        this.$refs.chapter.previous()
      }
      if (e.key === 'ArrowRight') {
        this.$refs.chapter.next()
      }
    })
    this.mangaId = this.$route.params.mangaId
    this.chapter = await getChapter(this.$route.params.id)
    this.images = this.chapter.images.map(i => {
      return {
        number: i[0],
        src: i[1],
        h: i[2],
        w: i[3]
      }
    })
    this.firstNumber = this._.maxBy(this.images, (i) => i.number).number
    this.lastNumber = this._.minBy(this.images, (i) => i.number).number
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
