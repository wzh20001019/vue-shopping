<template>
  <section class="navbar-container">
    <div class="to-category" @click="$router.push('/category')">
      <van-icon name="diamond-o" />
    </div>
    <div class="to-search">
      <div class="sreach-box" @click="$router.push('/search')">
        <span>搜索</span>
      </div>
    </div>
    <div class="to-my" @click="$router.push('/my')">
      <van-icon name="user-o" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeNavBar'
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
      margin: 20px auto 10px;
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
</style>
