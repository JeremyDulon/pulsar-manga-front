<template>
  <q-page>
    <comic-language-list :comic-language-list="comicStore.list" />
  </q-page>
</template>

<script>
import ComicLanguageList from 'components/comic/ComicLanguageList'
import { mapStores } from 'pinia'
import { useComicStore } from '@/stores/comic'

export default {
  name: 'ListComic',
  components: { ComicLanguageList },
  mounted () {
    this.comicStore.doFetchComicLanguageList()
  },
  computed: {
    ...mapStores(useComicStore)
  }
}
</script>
