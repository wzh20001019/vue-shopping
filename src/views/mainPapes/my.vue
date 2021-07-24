<template>
  <nav-bar title="个人中心"></nav-bar>
  <section class="not-login my-container" v-if="!isLogin"></section>

  <section class="login my-container" v-else>
    <div class="userInfo-container">
      <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" />
      <div class="info">
        <p>
          <span>昵称: </span>&nbsp;&nbsp;&nbsp; <span>{{ info.nickName }}</span>
        </p>
        <p>
          <span>登录名: </span>&nbsp;&nbsp;&nbsp;
          <span>{{ info.loginName }}</span>
        </p>
        <p>
          <span>个人签名: </span>&nbsp;&nbsp;&nbsp;
          <span>{{ info.introduceSign }}</span>
        </p>
      </div>
    </div>

    <div class="cell">
      <van-cell-group>
        <van-cell title="我的订单" is-link @click="$router.push('/order')" />
        <van-cell title="账号管理" is-link @click="$router.push('/account')" />
        <van-cell title="地址管理" is-link @click="$router.push('/address')" />
        <van-cell title="关于我们" is-link @click="$router.push('/about')" />
      </van-cell-group>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

import { getItem } from '@/utils/storage'
import { ref, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import { getUserInfo } from '../../api/user'
export default {
  name: 'My',

  components: {
    NavBar
  },

  setup() {
    const router = useRouter()

    const isLogin = ref(false)

    const user = reactive({
      info: {}
    })

    onMounted(() => {
      if (!getItem('token')) {
        Toast('请先登录')
        isLogin.value = false
        setTimeout(() => {
          router.push('/login')
        }, 100)
      } else {
        isLogin.value = true
      }

      getUserInfo()
        .then(res => {
          if (res.data.resultCode !== 200) {
            isLogin.value = false
          } else {
            user.info = res.data.data
            isLogin.value = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    })

    return {
      isLogin,
      ...toRefs(user)
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 100px;

  .userInfo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 95%;
    height: 230px;
    background: #44c1c1;
    border-radius: 10px;
    box-shadow: 0px 0px 15px #222;

    img {
      margin-right: 20px;
      box-sizing: border-box;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1.5px solid #fff;
      overflow: hidden;
    }

    .info {
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 150px;

      p {
        flex: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .cell {
    margin-top: 30px;
  }
}
</style>
