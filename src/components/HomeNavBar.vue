<template>
  <section :class="{ 'navbar-container': true, active: isActive }">
    <div
      :class="{ 'to-category': true, current: isActive }"
      @click="$router.push('/category')"
    >
      <van-icon name="diamond-o" />
    </div>
    <div class="to-search">
      <div class="sreach-box" @click="$router.push('/search')">
        <span>搜索</span>
      </div>
    </div>
    <div
      :class="{ 'to-my': true, current: isActive }"
      @click="$router.push('/my')"
    >
      <van-icon name="user-o" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeNavBar',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
.navbar-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: transparent;
  z-index: 99;

  .to-category,
  .to-my {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 100%;

    .van-icon {
      color: #21aaaa;
      font-size: 44px;
    }
  }

  .to-search {
    flex: 1;

    .sreach-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px auto;
      width: 90%;
      height: 60px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.5);

      span {
        font-size: 30px;
        color: #888;
      }
    }
  }
}

.active {
  background: #1baeae;
}

.current {
  .van-icon {
    color: #fff !important;
  }
}
</style>
