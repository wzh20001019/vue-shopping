<template>
  <section>
    <div class="active-num">404</div>
    <div class="active-txt">{{ num }} 秒后跳转至主页</div>
  </section>
</template>

<script>
export default {
  name: '404',
  data() {
    return {
      num: 5
    }
  },

  mounted() {
    const timer = setInterval(() => {
      this.$data.num--

      if (this.$data.num <= 0) {
        clearInterval(timer)
        this.$router.push('/index')
      }
    }, 1000)
  }
}
</script>

<style scoped lang="less">
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .active-num {
    margin-bottom: 150px;
    font-size: 100px;
    color: #cc0000;
  }

  .active-txt {
    font-size: 40px;
    color: #cc3030d3;
  }
}
</style>
