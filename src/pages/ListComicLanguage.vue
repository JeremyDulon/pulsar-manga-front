<template>
  <q-page>
    <comic-language-list :comic-language-list="comicLanguageList" />
  </q-page>
</template>

<script>
import ComicLanguageList from 'components/comic/ComicLanguageList'
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'ListComic',
  components: { ComicLanguageList },
  created () {
    this.onCreated()
  },
  methods: {
    ...mapActions({
      getComicLanguageList: 'comic/comicLanguage/retrieveListItems'
    }),
    onCreated () {
      this.getComicLanguageList()
    }
  },
  computed: {
    ...mapGetters({
      comicLanguageList: 'comic/comicLanguage/items'
    })
  }
}
</script>
