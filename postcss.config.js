module.exports = {
  plugins: {
    // 兼容的环境 (vue-cli中配置了可以不用写)
    // autoprefixer: {
    // browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    'postcss-pxtorem': {
      // rootValue: 37.5,   // (数字) 对应设计图宽度 375 * 667

      // (函数) vant样式: 37.5   自己的样式:75 (移动端)
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'] // 转换所有css样式
    }
  }
}
