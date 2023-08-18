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
    <comic-language-list v-if="filteredList" :manga-list="filteredList" />

  </q-page>
</template>

<script>
import ComicLanguageList from 'components/comic/ComicLanguageList'
import _ from 'lodash'
export default {
  name: 'SearchManga',
  components: { ComicLanguageList },
  data () {
    return {
      text: '',
      mangaList: [],
      filteredList: []
    }
  },
  async created () {
    alert('todo')
  },
  watch: {
    text: {
      handler: _.debounce(function (t) {
        const regexp = RegExp(t.toLowerCase())
        let filteredList = _.filter(this.mangaList, (m) => {
          return regexp.test(m.title.toLowerCase())
        })
        this.filteredList = _.orderBy(filteredList, ['h'], ['desc'])
      }, 250)
    }
  }
}
</script>
