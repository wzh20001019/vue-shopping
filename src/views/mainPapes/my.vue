<template>
  <section class="not-login-container">
    my
  </section>
</template>

<script>
import { getItem } from '../../utils/storage'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
  name: 'My',

  setup() {
    const router = useRouter()

    onMounted(() => {
      if (!getItem('token')) {
        Toast('请先登录')
        setTimeout(() => {
          router.push('/login')
        }, 100)
      }
    })
  }
}
</script>

<style scoped lang="less"></style>
