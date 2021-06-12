<template>
  <section>detail {{ $route.params.id }}</section>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Detail',

  setup() {
    const route = useRoute()

    onMounted(() => {
      console.log(route.params.id)
    })
  }
}
</script>

<style scoped lang="less"></style>
