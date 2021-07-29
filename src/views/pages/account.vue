<template>
  <nav-bar title="账号管理"></nav-bar>
  <section class="account-container">
    <div class="user-info">
      <van-field v-model="nickName" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button type="primary" @click="save" block>保存</van-button>
    <van-button type="primary" @click="handleLogout" block>退出登录</van-button>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getUserInfo, editUserInfo, logout } from '@/api/user'
import { removeItem } from '@/utils/storage'

import md5 from 'js-md5'

import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'
export default {
  name: 'Account',
  components: {
    NavBar
  },

  setup() {
    const router = useRouter()

    const state = reactive({
      nickName: '',
      introduceSign: '',
      password: ''
    })

    onMounted(async () => {
      const { data: res } = await getUserInfo()

      state.nickName = res.data.nickName
      state.introduceSign = res.data.introduceSign
    })

    const save = async () => {
      const params = {
        introduceSign: state.introduceSign,
        nickName: state.nickName
      }
      if (state.password) {
        params.passwordMd5 = md5(state.password)
      }
      await editUserInfo(params)
      Toast.success('保存成功')

      setTimeout(() => {
        router.push('/my')
      }, 1000)
    }

    const handleLogout = () => {
      Dialog.confirm({
        title: '退出登录',
        message: '确定退出登录吗?'
      })
        .then(async () => {
          await logout()

          removeItem('token')
          setTimeout(() => {
            router.push('/home')
          }, 1000)
        })
        .catch(() => {})
    }

    return {
      ...toRefs(state),
      save,
      handleLogout
    }
  }
}
</script>

<style scoped lang="less">
.account-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;

  .van-button {
    margin: 40px auto 0;
    width: 80%;
    border-radius: 44px;
    background: #1baeae;
  }
}
</style>
