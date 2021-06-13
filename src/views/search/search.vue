<template>
  <search-nav-bar ref="searchNav" @myHistory="myHistory"></search-nav-bar>

  <section class="history-container" v-if="historyList.length !== 0">
    <div class="history-box">
      <span>搜索历史</span>
      <van-icon name="delete-o" @click="clearHistory" />
    </div>
    <div class="history-tags">
      <van-tag
        closeable
        size="large"
        type="primary"
        v-for="(item, index) in historyList"
        :key="index"
        @click="goSearch(item)"
        @close="close(index)"
      >
        {{ item }}
      </van-tag>
    </div>
  </section>

  <van-tabs type="card" v-model:active="active" color="#21aaaa" animated v-else>
    <van-tab title="推荐">
      <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
        <img src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="" />
      </van-pull-refresh>
    </van-tab>
    <van-tab title="新品">
      <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
        <img src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="" />
      </van-pull-refresh>
    </van-tab>
    <van-tab title="价格">
      <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
        <img src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="" />
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<script>
import SearchNavBar from '@/components/SearchNavBar.vue'
import { setItem, getItem, removeItem } from '@/utils/storage'

import { ref, reactive } from 'vue'
import { Toast } from 'vant'
export default {
  name: 'Search',
  components: {
    SearchNavBar
  },

  setup() {
    const active = ref(0)

    const searchNav = ref(null)

    const historyList = ref(getItem('history') || [])

    const state = reactive({
      count: 0,
      loading: false
    })

    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功')
        state.loading = false
        state.count++
      }, 1000)
    }

    const clearHistory = () => {
      historyList.value = []
      removeItem('history')
    }

    const myHistory = val => {
      historyList.value.unshift(val)

      const historyArr = new Set(historyList.value)

      historyList.value = Array.from(historyArr)

      setItem('history', historyList.value)
    }

    const goSearch = item => {
      searchNav.value.value = item
    }

    const close = index => {
      historyList.value.splice(index, 1)

      if (historyList.value.length === 0) {
        return removeItem('history')
      }

      setItem('history', historyList.value)
    }

    return {
      active,
      state,
      onRefresh,
      clearHistory,
      myHistory,
      historyList,
      goSearch,
      close,
      searchNav
    }
  }
}
</script>

<style scoped lang="less">
.van-tabs {
  top: 40px;
}

.van-tab__pane,
.van-tab__pane-wrapper {
  text-align: center;
  width: 100vw;
}

.van-pull-refresh {
  height: 800px;

  img {
    margin-top: 60px;
    width: 300px;
    height: 300px;
  }
}

.history-container {
  margin-top: 40px;
  width: 100%;

  .history-box {
    position: relative;
    padding: 0 20px;
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #000;
    border-color: #21aaaa;

    span {
      float: left;
      color: #21aaaa;
      font-size: 35px;
    }

    .van-icon {
      float: right;
      margin-right: 10px;
      font-size: 50px;
      color: #ccc;
    }
  }
}

.van-tag--large {
  padding: 15px 10px;
  margin: 10px;
  background: #169a9a;
}

/deep/.van-tag__close {
  margin-left: 30px;
}
</style>
