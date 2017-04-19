<template>
  <section class="container">
    あああ{{JSON.stringify($store.state.toots.toots, null, '  ')}}
    <div class="toots">
      <toot v-for="toot in $store.state.toots.toots" :data="data"></toot>
    </div>
  </section>
</template>

<style scoped>
</style>

<script>
import Toot from '~components/toot.vue'

export default {
  components: { Toot },
  async fetch ({store}) {
    await store.dispatch('toots/fetch')
  }
}
</script>
