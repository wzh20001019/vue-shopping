<template>
  <section>
    cart
  </section>
</template>

<script>
import { getItem } from '../../utils/storage'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
  name: 'Cart',

  setup() {
    const router = useRouter()

    onMounted(() => {
      if (!getItem('token')) {
        Toast('请先登录')
        setTimeout(() => {
          router.push('/my')
        }, 100)
      }
    })
  }
}
</script>

<style scoped lang="less"></style>
