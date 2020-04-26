<template>
  <q-card class="pulsar-card">
    <q-card-section>
      <slot name="footer">
        <div v-if="title" class="text-h6">{{ title }}</div>
      </slot>
      <slot />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'PulsarCard',
  props: {
    title: String
  }
}
</script>

<style scoped>
  .pulsar-card {
    font-size: 1rem;
  }
</style>
