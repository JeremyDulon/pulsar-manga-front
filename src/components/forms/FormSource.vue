<template>
  <q-form
    class="q-px-md"
    @submit="onSubmit" @reset="onReset">
    <div>
      <q-input
          class="col-12"
          filled
          v-model="url"
          label="Manga's url"
          :rules="[ val => val && val.length > 0 || 'Set an url']"
      />
    </div>
    <div class="row q-gutter-lg">
      <q-input
          class="col"
          filled
          type="number"
          v-model="offset"
          label="Offset"
      />
      <q-input
          class="col"
          filled
          type="number"
          v-model="chapter"
          label="Chapter Number"
      />
    </div>
    <q-toggle v-model="images" label="Add images" />
    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { addSource } from '@/utils/api'

export default {
  name: 'FormSource',
  props: {
    url: {
      type: String,
      default: null
    },
    chapter: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      offset: null,
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
