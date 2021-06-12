import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

import 'nprogress/nprogress.css' // 进度条 样式
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Skeleton,
  Button,
  Tab,
  Tabs,
  PullRefresh,
  Tag
} from 'vant'

import './style/index.less' // 引入自定义样式

const app = createApp(App)

// 全局过滤器
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}

app.use(store)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Icon)
app.use(Swipe)
app.use(SwipeItem)
app.use(Skeleton)
app.use(Button)
app.use(Tab)
app.use(Tabs)
app.use(PullRefresh)
app.use(Tag)

app.mount('#app')
