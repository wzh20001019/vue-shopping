<template>
  <van-nav-bar
    title="商品详情"
    left-arrow
    @click-left="$router.back()"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="ellipsis" size="20" />
    </template>
  </van-nav-bar>

  <section class="detail-container">
    <div class="side-box">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item
          v-for="(item, index) in sideList"
          :key="index"
          indicator-color="white"
          lazy-render
          @click="imgPre(index)"
        >
          <img :src="item" alt="" />
        </van-swipe-item>
        <template #indicator="{ active }" v-if="sideList.length !== 0">
          <div class="custom-indicator">
            {{ active + 1 }}/{{ sideList.length }}
          </div>
        </template>
      </van-swipe>
    </div>

    <van-cell-group v-if="sideList.length !== 0">
      <van-cell :label="data.goodsIntro">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">{{ data.goodsName }}</span>
          <van-tag type="warning">{{ data.tag }}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <div class="price-box" v-if="data.originalPrice">
      ￥{{ Number(data.originalPrice).toFixed(2) }}
    </div>

    <div class="tab-box">
      <van-tabs
        v-model:active="activeTab"
        color="#55e7fc"
        line-width="70px"
        line-height="2px"
      >
        <van-tab title="概述">
          <div class="overview" v-html="data.goodsDetailContent || ''"></div>
        </van-tab>
        <van-tab title="参数">
          <div>参数</div>
        </van-tab>
      </van-tabs>
    </div>
  </section>

  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" />
    <van-action-bar-icon icon="cart-o" text="店铺" />
    <van-action-bar-icon
      icon="shop-o"
      text="购物车"
      :badge="$store.state.total"
      @click="onClickIcon"
    />

    <van-action-bar-button
      type="warning"
      text="加入购物车"
      @click="onClickButton"
    />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script>
import { getGoodData, addCart } from '../../api/detail'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Toast, ImagePreview } from 'vant'
export default {
  name: 'Detail',

  setup() {
    const route = useRoute()
    const router = useRouter()

    const active = ref(0)
    const activeTab = ref(0)

    const detailData = reactive({
      sideList: [],
      data: {}
    })

    const sideList = computed(() => {
      return detailData.sideList
    })

    const data = computed(() => {
      return detailData.data
    })

    onMounted(async () => {
      try {
        const { data: res } = await getGoodData(route.params.id)
        if (res.resultCode === 200) {
          if (!res.data.goodsCoverImg.startsWith('http')) {
            res.data.goodsCoverImg =
              'http://backend-api-01.newbee.ltd' + res.data.goodsCoverImg
          }
          detailData.sideList = [
            res.data.goodsCoverImg,
            res.data.goodsCoverImg,
            res.data.goodsCoverImg,
            res.data.goodsCoverImg
          ]

          detailData.data = res.data
        }

        if (!localStorage.getItem('token')) {
          Toast('请先登录')

          return router.push('/login')
        }
      } catch (err) {
        console.log(err.message)
      }
    })

    const onClickRight = () => {
      Toast('点击了')
    }

    const imgPre = index => {
      ImagePreview({
        images: [...detailData.sideList],
        startPosition: index
      })
    }

    const onClickIcon = () => router.push('/cart')

    const onClickButton = async () => {
      try {
        const { data: res } = await addCart({
          goodsCount: 1,
          goodsId: detailData.data.goodsId
        })

        if (res.resultCode === 200) {
          Toast.success('添加成功')
        } else {
          Toast.fail(res.message)
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    return {
      onClickRight,
      onClickIcon,
      onClickButton,
      active,
      activeTab,
      imgPre,
      sideList,
      data
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar__arrow {
  font-size: 50px;
}

.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90px;
}

.detail-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 100px;

  .side-box {
    width: 100vw;
    height: 750px;

    .van-swipe {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .price-box {
    margin: 20px 0;
    padding-left: 30px;
    font-size: 50px;
    color: #cc0000;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 32px;
  background: rgba(0, 0, 0, 0.1);
}

.overview {
  width: 100vw;
  height: auto;

  /deep/img {
    width: 750px;
    height: auto;
  }
}
</style>
