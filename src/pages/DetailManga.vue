<template>
  <div>
    <q-header>
      <q-toolbar class="bg-cyan-9">
        <q-card flat class="bg-cyan-9">
          <q-card-section horizontal>
            <q-img class="col-xs-3" :src="mangaImage" contain style="max-height: 100px; max-width: 100px;" />
            <q-card-section>
              <q-toolbar-title>
                <strong>{{ manga.title }}</strong>
              </q-toolbar-title>
              <q-btn flat round dense :icon="sortIcon" @click="sortDesc = !sortDesc" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-toolbar>
    </q-header>
    <q-page padding>
      <div class="row">
        <div class="text-h6">Liste des chapitres</div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-4 col-md-3" v-for="chapter in sortedChapters" :key="chapter.id" @click="goToChapter(chapter.id)">
          <q-card>
            <q-card-section>
              <div class="col text-center">
                <div>{{ chapter.number }}</div>
                <i>{{ chapterDateDiff(chapter.date) }}</i>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>
<script>
import { getManga } from '@/utils/api'
import { todayDiff, dateFormatIso } from '@/utils/date'
import { getMangaImgUrl } from '@/utils/manga'

export default {
  name: 'DetailManga',
  data () {
    return {
      manga: {},
      chapters: [],
      sortDesc: true
    }
  },
  async created () {
    this.manga = await getManga(this.$route.params.id)
    this.chapters = this.manga.chapters.map(c => {
      return {
        id: c[3],
        title: c[2],
        number: c[0],
        date: c[1]
      }
    })
  },
  methods: {
    goToChapter (id) {
      this.$router.push({ name: 'chapter', params: { id: id, mangaId: this.$route.params.id } })
    },
    chapterDateDiff2 (d) {
      return todayDiff(new Date(d * 1000))
    },
    chapterDateDiff (d) {
      return dateFormatIso(d * 1000)
    }
  },
  computed: {
    lastUpdate () {
      return dateFormatIso(new Date(this.manga.last_chapter_date * 1000))
    },
    sortedChapters () {
      return this._.orderBy(this.chapters, ['number'], [ this.sortDesc ? 'desc' : 'asc' ])
    },
    sortIcon () {
      return 'fas fa-' + (this.sortDesc ? 'sort-numeric-down-alt' : 'sort-numeric-down')
    },
    mangaImage () {
      return getMangaImgUrl(this.manga.image)
    }
  }
}
</script>

<style scoped>
  .q-card__section {
    padding: 8px 16px;
  }
</style>
