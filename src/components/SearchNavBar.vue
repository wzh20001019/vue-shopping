<template>
  <section class="navbar-container">
    <div class="to-back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>
    <div class="search">
      <van-icon name="search" @click="search.focus()" />
      <input type="text" v-model.trim="value" ref="search" placeholder="搜索" />
      <van-icon name="cross" v-if="value.length > 0" @click="value = ''" />
    </div>
    <div class="search-btn">
      <van-button type="primary" size="small" @click="searchResults"
        >搜索</van-button
      >
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'SearchNvBar',

  setup(props, content) {
    const value = ref('')
    const search = ref(null)

    onMounted(() => {
      search.value.focus()
    })

    const searchResults = () => {
      if (!value.value) return search.value.focus()

      content.emit('myHistory', value.value)
    }

    return {
      value,
      search,
      searchResults
    }
  }
}
</script>

<style scoped lang="less">
.navbar-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: transparent;
  z-index: 99;

  .to-back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 100%;

    .van-icon {
      color: #21aaaa;
      font-size: 44px;
    }
  }

  .search {
    position: relative;
    flex: 1;
    margin: 15px 20px 0 20px;
    height: 60px;
    border: 1px solid #e9e9e9;
    overflow: hidden;
    border-radius: 30px;

    .van-icon-search {
      position: absolute !important;
      top: 5px;
      left: 10px;
      font-size: 50px;
    }

    .van-icon-cross {
      position: absolute !important;
      top: 10px;
      right: 15px;
      font-size: 40px;
      background: rgba(100, 100, 100, 0.1);
      border-radius: 50%;
    }

    input {
      position: absolute;
      top: 12px;
      left: 80px;
      border: none;
      width: 360px;
      height: 36px;
      font-size: 28px;
    }
  }

  .search-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 100%;

    .van-button {
      font-size: 30px;
      border-color: #1baeae;
      background: #1baeae;
      border-radius: 10px;
    }
  }
}
</style>
