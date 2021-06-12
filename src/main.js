import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

import 'nprogress/nprogress.css' // 进度条 样式
import { Tabbar, TabbarItem, NavBar, Icon } from 'vant'

import './style/index.less' // 引入自定义样式

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Icon)

app.mount('#app')
