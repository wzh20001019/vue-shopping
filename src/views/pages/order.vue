<template>
  <nav-bar title="我的订单"></nav-bar>
  <section class="order-container">
    <div class="tabs-container">
      <van-tabs
        v-model:active="status"
        color="#1baeae"
        title-active-color="#1baeae"
        @change="changeTab"
      >
        <van-tab title="全部" name=""></van-tab>
        <van-tab title="代付款" name="0"></van-tab>
        <van-tab title="待确认" name="1"></van-tab>
        <van-tab title="代发货" name="2"></van-tab>
        <van-tab title="已发货" name="3"></van-tab>
        <van-tab title="交易完成" name="4"></van-tab>
      </van-tabs>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="10"
      >
        <!-- @click="goTo(item.orderNo)" -->
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="goOrderDetail(item.orderNo)"
          class="order-item-box"
        >
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <van-card
            v-for="i in item.newBeeMallOrderItemVOS"
            :key="i.orderId"
            :num="i.goodsCount"
            :price="Number(i.sellingPrice).toFixed(2)"
            desc="全场包邮"
            :title="i.goodsName"
            :thumb="$filters.prefix(i.goodsCoverImg)"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getOrderList } from '../../api/order'

import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
export default {
  name: 'Order',
  components: {
    NavBar
  },

  setup() {
    const state = reactive({
      status: '',
      loading: false,
      finished: false,
      refreshing: false, // 加载中的状态
      list: [],
      page: 1,
      totalPage: 0
    })

    const init = async () => {
      const { data: res } = await getOrderList({
        pageNumber: state.page,
        status: state.status
      })

      // state.list = state.list.concat(res.data.list)
      state.list.push(...res.data.list)

      state.totalPage = res.data.totalPage
      state.loading = false
      if (state.page >= res.data.totalPage) state.finished = true
    }

    const changeTab = name => {
      state.status = name
      onRefresh()
    }

    const onRefresh = () => {
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
      }
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      init()
    }

    const goOrderDetail = id => {
      Toast('订单号: ' + id)
    }

    return {
      ...toRefs(state),
      changeTab,
      onRefresh,
      onLoad,
      goOrderDetail
    }
  }
}
</script>

<style scoped lang="less">
.order-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  height: auto;

  .tabs-container {
    position: sticky;
    top: 90px;
    z-index: 999;
  }

  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .order-item-box {
    margin: 50px 20px;
    background-color: #fff;

    .order-item-header {
      padding: 10px 20px 0 20px;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 28px;
        color: rgb(151, 150, 150);
      }
    }
    .van-card {
      background-color: #fff;
      margin-top: 0;

      /deep/.van-card__price {
        color: #cc0000;
      }
    }

    /deep/.van-card__thumb {
      margin-right: 30px;
    }
  }
}
</style>
