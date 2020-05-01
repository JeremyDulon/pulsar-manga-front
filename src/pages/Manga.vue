<template>
  <div>
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>
          <strong>Quasar</strong> Framework
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page padding>
      <div class="row">
        <h6>Liste des chapitres</h6>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-3" v-for="chapter in chapters" :key="chapter.id" @click="goToChapter(chapter.id)">
          <q-card>
            <q-card-section>
              <div class="col text-center">
                <div>{{ chapter.number }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-page-sticky expand position="top">
        <q-toolbar class="bg-accent text-white">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <q-toolbar-title>
            Page Title
          </q-toolbar-title>
        </q-toolbar>
      </q-page-sticky>
    </q-page>
  </div>
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

<style scoped>
  .q-card__section {
    padding: 8px 16px;
  }
</style>
