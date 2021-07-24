<template>
  <nav-bar title="购物车"></nav-bar>

  <section
    class="air cart-container"
    v-if="cartList.length === 0"
    v-show="isAirShow"
  >
    <img
      src="https://s.yezgea02.com/1604028375097/empty-car.png"
      alt="空购物车"
    />

    <van-button type="primary" block @click="$router.push('/home')"
      >前往选购</van-button
    >
  </section>

  <section class="no-air cart-container" v-else v-show="isNoAirShow">
    <van-checkbox-group
      @click="groupChange"
      v-model="result"
      ref="checkboxGroup"
    >
      <van-swipe-cell v-for="(item, index) in cartList" :key="index">
        <van-card
          :num="item.goodsCount"
          :price="Number(item.sellingPrice).toFixed(2)"
          :title="item.goodsName"
          class="goods-card"
          :thumb="$filters.prefix(item.goodsCoverImg)"
        />
        <van-checkbox :name="item.cartItemId"></van-checkbox>
        <template #right>
          <van-button
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteCarts(item.cartItemId)"
          />
        </template>

        <van-stepper
          v-model="item.goodsCount"
          min="1"
          max="5"
          @change="changeCount(item.cartItemId, item.goodsCount)"
          integer
          disable-input
        />
      </van-swipe-cell>
    </van-checkbox-group>

    <van-submit-bar :price="price * 100" button-text="结算" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="qxChecked">全选</van-checkbox>
    </van-submit-bar>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

import { getItem } from '@/utils/storage'
import { getCart, modifyCart, deleteCart } from '@/api/cart'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Cart',

  components: {
    NavBar
  },

  setup() {
    const router = useRouter()
    const store = useStore()

    const cartList = ref([])
    const result = ref([])
    const newList = ref([])
    const checked = ref(true)
    const isAirShow = ref(false)
    const isNoAirShow = ref(false)
    const total = ref(0)

    const price = ref(0)

    onMounted(() => {
      if (!getItem('token')) {
        Toast('请先登录')
        setTimeout(() => {
          router.push('/login')
        }, 100)
      }

      init()
    })

    const init = () => {
      getCart()
        .then(res => {
          cartList.value = res.data.data

          if (cartList.value.length > 0) {
            isNoAirShow.value = true
          } else {
            isAirShow.value = true
          }

          result.value = cartList.value.map(item => item.cartItemId)
          TotalPrice()
          sumTotal()
        })
        .catch(err => {
          console.log(err.message)
        })
    }

    const TotalPrice = () => {
      newList.value = []

      cartList.value.forEach(item => {
        result.value.forEach(doc => {
          if (item.cartItemId === doc) newList.value.push(item)
        })
      })

      price.value = newList.value.reduce(
        (num, item) => (num += item.sellingPrice * item.goodsCount),
        0
      )
    }

    const sumTotal = () => {
      total.value = cartList.value.reduce(
        (num, item) => (num += item.goodsCount),
        0
      )

      store.commit('updateTotal', total.value)
    }

    const onSubmit = () => {
      if (result.value.length === 0) {
        return Toast.fail('请选择商品')
      }
      router.push({
        path: '/create-order',
        query: {
          cartItemIds: JSON.stringify(result.value)
        }
      })
    }

    const groupChange = () => {
      if (result.value.length !== cartList.value.length) {
        checked.value = false
      } else {
        checked.value = true
      }

      TotalPrice()
    }

    const qxChecked = () => {
      if (checked.value) {
        result.value = cartList.value.map(item => item.cartItemId)
      } else {
        result.value = []
      }

      TotalPrice()
    }

    const changeCount = async (id, value) => {
      const params = {
        cartItemId: id,
        goodsCount: value
      }
      TotalPrice()
      sumTotal()

      const { data: res } = await modifyCart(params)

      if (res) return true
    }

    const deleteCarts = async id => {
      const { data: res } = await deleteCart(id)

      if (res.resultCode !== 200) Toast.fail('操作失败')

      init()
    }

    return {
      onSubmit,
      groupChange,
      qxChecked,
      changeCount,
      deleteCarts,
      cartList,
      result,
      checked,
      price,
      isAirShow,
      isNoAirShow
    }
  }
}
</script>

<style scoped lang="less">
.van-checkbox-group {
  padding-bottom: 200px;
}

.cart-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 100px;
}

.air {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 60px;
    width: 400px;
    height: auto;
  }

  .van-button {
    width: 50%;
    border-radius: 44px;
  }
}

.goods-card {
  margin: 0;
  background-color: #fff;
}

.no-air {
  bottom: 200px;

  .van-card {
    padding-left: 80px;

    /deep/.van-card__price {
      color: #cc0000;
    }

    /deep/.van-card__num {
      position: absolute;
      top: 0;
      right: -10px;
      color: #969799;
    }
  }

  .van-card:last-child {
    margin-bottom: 100px;
  }

  .van-stepper {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  .van-submit-bar {
    bottom: 100px;
  }

  /deep/.van-submit-bar__button--danger {
    background: #1baeae;
  }

  .van-checkbox {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
}

.delete-button {
  height: 100%;
}
</style>
