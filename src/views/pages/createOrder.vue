<template>
  <nav-bar title="生成订单"></nav-bar>
  <section class="create-order-container">
    <div class="address" @click="$router.push('/address')">
      <div class="user">
        <span>{{ address.userName }} {{ address.userPhone }}</span>
        <span
          >{{ address.provinceName }} {{ address.cityName }}
          {{ address.regionName }} {{ address.detailAddress }}</span
        >
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="goods-wrap">
      <div
        class="goods-container"
        v-for="(item, index) in goodsList"
        :key="index"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="goods-item">
          <div class="goods">
            <span>{{ item.goodsName }}</span>
            <span>×{{ item.goodsCount }}</span>
          </div>
          <div class="price">
            <span>￥{{ Number(item.sellingPrice).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="settlement">
    <div class="settlement-price">
      <span>商品金额</span>
      <span v-if="goodsList.length > 0"
        >￥{{ Number(settlement).toFixed(2) }}</span
      >
    </div>
    <van-button type="primary" block @click="handleCreateOrder"
      >生成订单</van-button
    >

    <van-popup
      v-model:show="show"
      :close-on-click-overlay="false"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      @close="close"
    >
      <div :style="{ margin: '0 auto', width: '90%', padding: '60px 0' }">
        <van-button @click="handlePayOrder(1)" color="#1989fa" block
          >支付宝支付</van-button
        >
        <van-button
          @click="handlePayOrder(2)"
          color="#4fc08d"
          :style="{ marginTop: '20px' }"
          block
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

import { getDefaultAddress, getAddress } from '@/api/address'
import { getOrderCart } from '@/api/cart'
import { createOrder, payOrder } from '../../api/order'

import { reactive, ref, onMounted, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

export default {
  name: 'CreateOrder',
  components: {
    NavBar
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const { addressId, cartItemIds } = route.query
    const _cartItemIds = JSON.parse(cartItemIds)

    const state = reactive({
      goodsList: [],
      address: {},
      orderNo: ''
    })

    const show = ref(false)

    onMounted(() => {
      init()
    })

    const init = async () => {
      const { data: list } = await getOrderCart({
        cartItemIds: _cartItemIds.join(',')
      })

      if (list.resultCode === 200) {
        state.goodsList = list.data
      } else {
        router.push('/cart')
      }

      const { data: address } = addressId
        ? await getAddress(addressId)
        : await getDefaultAddress()

      if (address.resultCode === 200) {
        state.address = address.data
      }
    }

    const settlement = computed(() => {
      return state.goodsList.reduce(
        (num, item) => (num += item.goodsCount * item.sellingPrice),
        0
      )
    })

    const handleCreateOrder = async () => {
      const params = {
        addressId: state.address.addressId,
        cartItemIds: state.goodsList.map(item => item.cartItemId)
      }

      const { data: res } = await createOrder(params)

      show.value = true
      state.orderNo = res.data
    }

    const handlePayOrder = async type => {
      await payOrder({ orderNo: state.orderNo, payType: type })

      Toast.success('支付成功')
      setTimeout(() => {
        router.push({ path: '/order' })
      }, 2000)
    }

    const close = () => {
      Toast('未支付')
      router.push({ path: '/order' })
    }

    return {
      ...toRefs(state),
      handleCreateOrder,
      handlePayOrder,
      close,
      settlement,
      show
    }
  }
}
</script>

<style scoped lang="less">
.create-order-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  height: auto;

  .address {
    position: fixed;
    top: 90px;
    left: 0;
    padding: 40px 30px;
    width: 100%;
    height: 180px;
    font-size: 30px;
    color: #222333;
    background: #fff;
    z-index: 99;

    .user {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      float: left;
      width: 90%;
      height: 100%;
    }

    .icon {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      float: right;
      width: 10%;
      height: 100%;

      .van-icon {
        font-size: 40px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 160px;
    }
  }

  .goods-wrap {
    position: absolute;
    top: 210px;
    left: 0;
    right: 0;
    height: auto;

    .goods-container {
      display: flex;
      padding: 20px;
      width: 100%;
      height: 260px;
      background: #fff;
      border-bottom: 0.5px solid rgb(236, 236, 236);

      &:last-child {
        margin-bottom: 200px;
        border-bottom: none;
      }

      img {
        float: left;
        width: 220px;
        height: 220px;
      }

      .goods-item {
        flex: 1;
        padding: 30px 20px;
        font-size: 28px;
        color: #222333;

        .goods {
          span {
            display: inline-block;
            &:nth-child(1) {
              width: 400px;
            }
            &:nth-child(2) {
              float: right;
              margin-left: 10px;
            }
          }
        }

        .price {
          margin-top: 40px;

          span {
            font-size: 30px;
            color: #cc0000;
          }
        }
      }
    }
  }
}

.settlement {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 30px 30px 20px 30px;
  height: 200px;
  background: #f9f9f9;

  .settlement-price {
    height: 80px;
    font-size: 28px;

    span {
      &:nth-child(1) {
        float: left;
      }

      &:nth-child(2) {
        float: right;
        font-size: 32px;
        color: #cc0000;
      }
    }
  }

  .van-button {
    background: #1baeae;
  }
}
</style>
