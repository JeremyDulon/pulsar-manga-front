<template>
  <div class="col-12">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit" @reset="onReset">
      <q-input
        filled
        v-model="url"
        label="Manga's url"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Set an url']"
      />
      <q-input
        type="number"
        v-model="offset"
        label="Offset"
      />
      <q-input
        type="number"
        v-model="chapter"
        label="Chapter Number"
      />
      <q-toggle v-model="images" label="Add images" />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { addSource } from '@/utils/api'

export default {
  name: 'FormSource',
  props: {
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      offset: null,
      chapter: null,
      images: true
    }
  },
  methods: {
    async onSubmit () {
      let success = await addSource({
        url: this.url,
        offset: this.offset,
        chapter: this.chapter,
        images: this.images
      })
      if (success) {
        this.$q.notify('Source added')
      } else {
        this.$q.notify('Unknown error')
      }
    },
    onReset () {
      this.url = null
      this.offset = null
      this.chapter = null
      this.images = true
    }
  }
}
</script>
