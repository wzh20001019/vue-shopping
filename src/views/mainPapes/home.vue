<template>
  <home-nav-bar></home-nav-bar>
</template>

<script>
import { getHomeData } from '@/api/home'
import NProgress from 'nprogress'

import { onMounted } from 'vue'

import HomeNavBar from '@/components/HomeNavBar.vue'
export default {
  name: 'Home',
  components: {
    HomeNavBar
  },

  setup() {
    onMounted(async () => {
      try {
        NProgress.start()
        const { data: res } = await getHomeData()

        if (res) {
          NProgress.done()
          console.log(res)
        }
      } catch (err) {
        return console.log(err.message)
      }
    })

    return {}
  }

  // beforeCreate() {
  //   NProgress.start()
  // },

  // mounted() {
  //   NProgress.done()
  // }
}
</script>

<style scoped lang="less"></style>
