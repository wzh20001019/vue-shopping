<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component }">
    <!-- include="Home" -->
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <van-tabbar v-model="active" active-color="#755bea" route>
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="qr">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o" badge="0"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Index',

  setup() {
    const active = ref(0)

    return {
      active
    }
  }
}
</script>

<style scoped lang="less">
.van-tabbar {
  box-shadow: 0 1px 7px #000;
}
</style>
