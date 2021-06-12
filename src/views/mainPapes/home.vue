<template>
  <home-nav-bar :isActive="isActive"></home-nav-bar>

  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="#147E7E"
    lazy-render
  >
    <van-swipe-item v-for="(item, index) in carousels" :key="index">
      <img :src="item.carouselUrl" />
    </van-swipe-item>
  </van-swipe>

  <section class="nav-lists">
    <div
      class="nav-list"
      v-for="(item, index) in navLists"
      :key="index"
      @click="goNavList"
    >
      <div class="img-box">
        <img :src="item.imgSrc" />
      </div>
      <span>{{ item.name }}</span>
    </div>
  </section>

  <section class="newgoods-container">
    <header>新品上线</header>

    <div class="newgoods-box" v-if="newGoodses.length !== 0">
      <div
        class="newgood"
        v-for="(item, index) in newGoodses"
        :key="index"
        @click="goDetail(item.goodsId)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="title">{{ item.goodsName }}</div>
        <div class="price">￥ {{ Number(item.sellingPrice).toFixed(2) }}</div>
      </div>
    </div>

    <van-skeleton title :row="3" v-else />
  </section>

  <section class="hotGoodses-container">
    <header>热门商品</header>

    <div class="hotGoodses-box" v-if="hotGoodses.length !== 0">
      <div
        class="hotGoodses"
        v-for="(item, index) in hotGoodses"
        :key="index"
        @click="goDetail(item.goodsId)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="title">{{ item.goodsName }}</div>
        <div class="price">￥ {{ Number(item.sellingPrice).toFixed(2) }}</div>
      </div>
    </div>

    <van-skeleton title :row="3" v-else />
  </section>

  <section class="recommendGoodses-container">
    <header>最新推荐</header>

    <div class="recommendGoodses-box" v-if="recommendGoodses.length !== 0">
      <div
        class="recommendGoodses"
        v-for="(item, index) in recommendGoodses"
        :key="index"
        @click="goDetail(item.goodsId)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="title">{{ item.goodsName }}</div>
        <div class="price">￥ {{ Number(item.sellingPrice).toFixed(2) }}</div>
      </div>
    </div>

    <van-skeleton title :row="3" v-else />
  </section>
</template>

<script>
import { getHomeData } from '@/api/home'
import NProgress from 'nprogress'

import { ref, reactive, toRefs, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import HomeNavBar from '@/components/HomeNavBar.vue'
export default {
  name: 'Home',
  components: {
    HomeNavBar
  },

  setup() {
    const isActive = ref(false)

    const router = useRouter()

    const homeData = reactive({
      carousels: [],
      hotGoodses: [],
      newGoodses: [],
      recommendGoodses: [],
      navLists: [
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
          name: '超市',
          listId: 1000
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
          name: '服饰',
          listId: 1001
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
          name: '全球购',
          listId: 1002
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
          name: '生鲜',
          listId: 1003
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
          name: '送到家',
          listId: 1004
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
          name: '充值缴费',
          listId: 1005
        },
        {
          imgSrc: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
          name: '9.9元拼',
          listId: 1006
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
          name: '领券',
          listId: 1007
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
          name: '钱包',
          listId: 1008
        },
        {
          imgSrc:
            'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
          name: '全部',
          listId: 1009
        }
      ]
    })

    onMounted(async () => {
      try {
        NProgress.start()
        const { data: res } = await getHomeData()

        if (res) {
          NProgress.done()
        }

        homeData.carousels = res.data.carousels
        homeData.hotGoodses = res.data.hotGoodses
        homeData.newGoodses = res.data.newGoodses
        homeData.recommendGoodses = res.data.recommendGoodses

        console.log(homeData)
      } catch (err) {
        return console.log(err.message)
      }
    })

    const goNavList = () => {
      return Toast('敬请期待')
    }

    nextTick(() => {
      window.addEventListener('scroll', () => {
        // 页面上侧被卷去的距离
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop >= 200) {
          isActive.value = true
        } else {
          isActive.value = false
        }
      })
    })

    const goDetail = id => {
      router.push('/detail/' + id)
    }

    return {
      isActive,
      ...toRefs(homeData),
      goNavList,
      goDetail
    }
  }

  // beforeCreate() {
  //   NProgress.start()
  // },

  // mounted() {
  //   NProgress.done()
  // }
}
</script>

<style scoped lang="less">
.van-swipe {
  width: 100vw;
  height: 360px;

  img {
    width: 100%;
    height: 100%;
  }
}

.nav-lists {
  margin: 0 0 30px;
  width: 100vw;
  height: 300px;

  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: left;
    width: 20%;
    height: 150px;

    .img-box {
      margin-bottom: 20px;
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    span {
      font-size: 26px;
    }
  }
}

.newgoods-container,
.hotGoodses-container,
.recommendGoodses-container {
  header {
    height: 100px;
    text-align: center;
    font-size: 35px;
    line-height: 100px;
    color: #1baeb5;
    background: #f9f9f9;
  }

  .newgoods-box,
  .hotGoodses-box,
  .recommendGoodses-box {
    width: 100%;
    // height: auto;
    overflow: hidden;

    .newgood:nth-child(2n + 1),
    .hotGoodses:nth-child(2n + 1),
    .recommendGoodses:nth-child(2n + 1) {
      border-right: 1px solid #e9e9e9;
    }

    .newgood,
    .hotGoodses,
    .recommendGoodses {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      float: left;
      padding: 0 20px;
      width: 50%;
      height: 440px;
      border-bottom: 1px solid #e9e9e9;

      img {
        width: 240px;
        height: 240px;
      }

      .title {
        margin-top: 20px;
        text-align: center;
        font-size: 28px;
      }

      .price {
        margin-top: 25px;
        font-size: 32px;
        color: #cc0000;
      }
    }
  }
}

.recommendGoodses-box {
  margin-bottom: 180px;
}
</style>
