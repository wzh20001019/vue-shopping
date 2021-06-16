<template>
  <section class="login container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
      @click-right="navRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />

      <!-- <van-field
        v-model="verify"
        name="verify"
        label="验证码"
        placeholder="验证码"
        :rules="rules.verify"
      /> -->

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

    <a href="javascript:;" @click="$router.push('/register')">立即注册</a>
  </section>
</template>

<script>
import { login } from '@/api/user'

import md5 from 'js-md5'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Login',

  setup() {
    const rules = reactive({
      username: [
        { required: true, message: '请填写用户名' },
        { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确的用户名' }
      ],
      password: [
        { required: true, message: '请填写密码' },
        { pattern: /^[a-z0-9]{6,18}$/, message: '请输入正确的密码' }
      ]
      // verify: [
      //   { required: true, message: '请填写验证码' },
      //   { pattern: /^[a-zA-Z0-9]{4}$/, message: '请填写正确的验证码' }
      // ]
    })

    const router = useRouter()
    const store = useStore()

    const state = reactive({
      username: '',
      password: '',
      verify: ''
    })

    const navRight = () => {
      Toast('点击了')
    }

    const onSubmit = async () => {
      try {
        const { data: res } = await login({
          loginName: state.username,
          passwordMd5: md5(state.password)
        })

        if (res.resultCode !== 200) {
          return Toast.fail('用户名或者密码错误')
        } else {
          Toast.success('登录成功')

          store.commit('updateToken', res.data)

          setTimeout(() => {
            router.push('/my')
          }, 1000)
        }

        console.log(res)
      } catch (err) {
        console.log(err.message)
      }
    }

    return {
      ...toRefs(state),
      onSubmit,
      navRight,
      rules
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow: hidden;
}

.van-form {
  margin-top: 60px;
}

a {
  float: right;
  margin: 40px 60px 0 0;
  color: #55e7fc;
  font-size: 30px;
}
</style>
