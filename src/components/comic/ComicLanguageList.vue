<template>
  <div class="q-pa-xs row q-gutter-xs manga-list">
    <q-intersection once :threshold="0.75" class="manga"
         v-for="comicLanguage in comicLanguageList"
         :key="comicLanguage.id">
      <comic-language-card :comicLanguage="comicLanguage" />
    </q-intersection>
  </div>
</template>

<script>
import ComicLanguageCard from 'components/comic/ComicLanguageCard'
export default {
  name: 'ComicLanguageList',
  components: { ComicLanguageCard },
  props: {
    comicLanguageList: {
      type: Array,
      default: () => []
    }
  }
}

</script>
