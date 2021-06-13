<template>
  <section class="nav-bar-container">
    <div class="back">
      <van-icon name="arrow-left" @click="$router.back()" />
    </div>
    <div class="go-search" @click="$router.push('/search')">
      <span>搜索</span>
    </div>
  </section>

  <section class="good-list-container">
    <div class="list">
      <van-sidebar v-model="active" @change="onChange">
        <van-sidebar-item
          v-for="(item, index) in cateGoryData"
          :key="index"
          :title="item.categoryName"
        />
      </van-sidebar>
    </div>

    <!-- 右侧商品区 -->
    <div class="goods wrapper" ref="scroll">
      <div class="content">
        <template v-for="(item, index) in cateGoryData" :key="index">
          <div class="goos-item" v-if="active == index">
            <div
              class="item-boxs"
              v-for="(item, index) in item.secondLevelCategoryVOS"
              :key="index"
            >
              <p>{{ item.categoryName }}</p>
              <div class="box-wrap">
                <div
                  class="box"
                  v-for="(item, index) in item.thirdLevelCategoryVOS"
                  :key="index"
                  @click="goDetail(item.categoryId)"
                >
                  <img
                    src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                    alt=""
                  />
                  <span>{{ item.categoryName }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { getCateGory } from '@/api/category'
import { ToastLoadingStart, ToastLoadingEnd } from '../../utils/toastLoading'

import { ref, reactive, onMounted, nextTick } from 'vue'
import { Toast } from 'vant'
import BScroll from 'better-scroll'
export default {
  name: 'Category',

  setup() {
    const active = ref(0)
    const scroll = ref(null)

    let bs = reactive({})

    const cateGoryData = ref([])

    onMounted(() => {
      getCateGory(ToastLoadingStart)
        .then(res => {
          if (res) ToastLoadingEnd()

          cateGoryData.value = res.data.data
        })
        .catch(err => {
          console.log(err)
        })

      bs = new BScroll(scroll.value, {
        probeType: 3, // 0, 1, 2, 3   3 --> 只要在运动就触发scroll事件
        click: true, // 是否允许被点击
        pullUpLoad: true // 上拉加载更多(默认为false)
      })

      // 上拉(pullingUp)加载数据
      bs.on('pullingUp', () => {
        // 完成上拉, 等数据请求完成, 将新数据展示出来
        bs.finishPullUp()

        // 计算高度
        bs.refresh()
      })
    })

    // 页面发生改变就重新计算高度
    nextTick(() => {
      bs && bs.refresh()
    })

    const onChange = index => {
      bs.scrollTo(0, 0, 0)
    }

    const goDetail = id => {
      return Toast('ID: ' + id)
    }

    return {
      active,
      onChange,
      cateGoryData,
      goDetail,
      scroll
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90px;
  background: #fff;

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    font-size: 50px;
    color: #147e7e;
  }

  .go-search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 12px 70px 12px 20px;
    background: #e7e5e5;
    border-radius: 30px;
    font-size: 30px;
    color: #147e7e;
  }
}

.good-list-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow: hidden;

  .list {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 30%;
    background: #f8f8f8;

    .van-sidebar {
      width: 100%;

      .van-sidebar-item {
        padding: 30px 20px;
        height: 110px;
        background: #f8f8f8;
      }

      .van-sidebar-item--select::before {
        width: 0;
        height: 0;
      }

      .van-sidebar-item--select,
      .van-sidebar-item--select:active {
        background: #fff;
      }

      .van-sidebar-item--select {
        color: #1bb5ad;
      }
    }
  }

  .wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 70%;
    overflow: hidden;

    .goos-item {
      // width: 100%;
      // height: 100%;

      .item-boxs {
        width: 100%;

        p {
          margin: 80px 0 40px;
          text-align: center;
          height: 80px;
          line-height: 80px;
          font-size: 45px;
          color: #ff9900;
        }

        .box-wrap {
          display: flex;
          flex-wrap: wrap;

          .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            width: 33%;
            height: 160px;

            img {
              margin-bottom: 30px;
              width: 60px;
              height: 60px;
            }

            span {
              font-size: 24px;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>
