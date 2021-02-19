<template>
  <q-dialog v-model="value" v-bind="$attrs" v-on="$listeners">
    <q-card class="no-wrap full-width">
      <q-card-section>
        <div class="text-h6 text-center">Add Source</div>
      </q-card-section>
      <q-card-section>
        <form-source :url="url" :chapter="chapter" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import FormSource from 'components/forms/FormSource'

export default {
  name: 'DialogAddSource',
  components: { FormSource },
  props: {
    value: Boolean,
    url: {
      type: String,
      default: null
    },
    chapter: {
      type: Number,
      default: null
    }
  }
}
</script>
