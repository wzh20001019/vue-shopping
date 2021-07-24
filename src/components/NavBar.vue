<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="$router.back()"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="ellipsis" size="20" />
    </template>
  </van-nav-bar>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'NavBar',

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  setup() {
    const onClickRight = () => {
      Toast('点击了')
    }

    return {
      onClickRight
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 0.5px solid rgb(231, 231, 231);
}

/deep/.van-nav-bar__arrow {
  font-size: 46px;
}
</style>
