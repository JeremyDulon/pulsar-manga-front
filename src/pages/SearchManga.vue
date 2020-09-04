<template>
  <q-page>
    <q-input v-model="text"
             placeholder="Rechercher"
             input-class="text-right"
             class="q-ml-md">
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
      </template>
    </q-input>
    <manga-list v-if="filteredList" :manga-list="filteredList" />

  </q-page>
</template>

<script>
import MangaList from 'components/list/MangaList'
import { getFilteredList } from '@/utils/manga'
import _ from 'lodash'
export default {
  name: 'SearchManga',
  components: { MangaList },
  data () {
    return {
      text: '',
      mangaList: [],
      filteredList: []
    }
  },
  async created () {
    this.mangaList = await getFilteredList()
  },
  watch: {
    text: {
      handler: _.debounce(function (t) {
        const regexp = RegExp(t.toLowerCase())
        let filteredList = this._.filter(this.mangaList, (m) => {
          return regexp.test(m.t.toLowerCase())
        })
        this.filteredList = this._.orderBy(filteredList, ['h'], ['desc'])
      }, 250)
    }
  }
}
</script>
