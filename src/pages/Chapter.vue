<template>
  <div>
    <q-header v-if="navigation" class="bg-black" style="z-index: 9999">
      <q-toolbar>
        <q-btn size="lg" icon="fa fa-angle-left" color="black" @click="backToManga"  />
        <q-toolbar-title>
          <div class="text-h6">{{ currentImage+1 }}/{{ lastNumber+1 }} {{ manga.title }} {{ chapter.number }}: {{ chapter.title }}</div>
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
                          :img-src="image.src"
                          :draggable="false"
                          class="chapter-slide"
                          @click="navigation = !navigation"/>
        <template v-slot:control v-if="navigation">
          <q-carousel-control position="bottom" :offset="[18, 18]">
            <q-slider v-model="currentImage"
                      label
                      :label-value="currentImage + 1"
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
import { getChapter, getManga } from '@/utils/api'
import { CDN_BASE_URL } from '@/consts/api'
import { createNamespacedHelpers } from 'vuex'
import UserConfig from 'pages/UserConfig'
const storeUserConfig = createNamespacedHelpers('userConfig')

export default {
  name: 'ChapterPage',
  components: { UserConfig },
  data () {
    return {
      manga: {},
      chapter: {},
      images: [],
      currentImage: 0,
      firstNumber: null,
      lastNumber: null,
      navigation: true,
      showSettings: false,
      trNext: 'slide-left',
      trPrev: 'slide-right'
    }
  },
  computed: {
    ...storeUserConfig.mapGetters({
      read: 'getRead',
      vertical: 'getVertical'
    }),
    orderedImages () {
      return _.orderBy(this.images, ['number'], [
        this.read === 'ltr' ? 'asc' : 'desc'
      ])
    }
  },
  async created () {
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
    this.chapter = _.find(this.manga.chapters, (c) => c.id === this.$route.params.id)
    this.images = chapter.images.map(i => {
      return {
        number: i[0],
        src: this.chapterImage(i[1]),
        h: i[2],
        w: i[3]
      }
    })
    this.firstNumber = _.minBy(this.images, (i) => i.number).number
    this.lastNumber = _.maxBy(this.images, (i) => i.number).number
  },
  methods: {
    chapterImage (path) {
      return CDN_BASE_URL + path
    },
    backToManga () {
      this.$router.push({ name: 'manga', params: { id: this.$route.params.mangaId } })
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
