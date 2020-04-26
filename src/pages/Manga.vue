<template>
  <q-page padding>
    <span>{{ manga.title }}</span>
    <div class="row q-col-gutter-xs">
      <div class="col-md-4 col-xs-6" v-for="chapter in chapters" :key="chapter.id" @click="goToChapter(chapter.id)">
        <q-card>
          <q-card-section>
            <div class="col text-center">
              <div>{{ chapter.number }}</div>
              <div>{{ chapter.number }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { getManga } from '@/utils/api'

export default {
  name: 'MangaPage',
  data () {
    return {
      manga: {},
      chapters: []
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
    }
  }
}
</script>
