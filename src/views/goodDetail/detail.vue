<template>
  <van-nav-bar
    title="商品详情"
    left-arrow
    @click-left="$router.back()"
    @click-right="onClickRight"
  />

  <section>detail {{ $route.params.id }}</section>
</template>

<script>
import { getGoodData } from '../../api/detail'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Detail',

  setup() {
    const route = useRoute()

    onMounted(() => {
      getGoodData(route.params.id)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.message)
        })
    })

    const onClickRight = () => {
      console.log('onClickRight')
    }

    return {
      onClickRight
    }
  }
}
</script>

<style scoped lang="less"></style>
