<template>
  <div class="fit row wrap justify-center items-center content-center">
    <q-card>
      <q-card-section class="text-center">
        Issue Quality
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center">
        <q-btn-group>
          <q-btn color="accent" label="Good" @click="updateQuality(100)" />
          <q-btn color="accent" label="Poor" @click="updateQuality(200)" />
          <q-btn color="accent" label="Bad" @click="updateQuality(300)" />
          <q-btn color="accent" label="Error" @click="updateQuality(400)" />
        </q-btn-group>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useComicIssueStore } from '@/stores/comicIssue'
import { toast } from '@/utils/ui'

export default {
  name: 'FormQuality',
  props: {
    comicIssueId: {
      type: Number
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapStores(useComicIssueStore)
  },
  methods: {
    updateQuality (quality) {
      this.comicIssueStore.doUpdateQuality({ id: this.comicIssueId, body: { quality: quality } })
        .then(() => {
          toast.info({ message: 'Quality updated', timeout: 200 })
          this.$emit('quality:updated')
        })
    }
  }
}
</script>
