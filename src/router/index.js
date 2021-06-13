import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/mainPapes/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/mainPapes/home.vue')
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/mainPapes/category.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/mainPapes/cart.vue')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/mainPapes/my.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/search.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/goodDetail/detail.vue')
  },
  {
    // 访问不存在的页面
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
