<template>
  <section class="container">
    <div class="toots">
      <toot v-for="toot in $store.state.toots.toots" :data="toot"></toot>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 980px;
  margin: 0 auto;
  background: rgba(255,255,255,0.7);
  box-sizing: border-box;
  padding: 0 30px;
}
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
