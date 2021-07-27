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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/pages/order.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/pages/account.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/pages/address.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/pages/about.vue')
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: () => import('../views/pages/createOrder.vue')
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

router.beforeEach((to, form, next) => {
  if (form.path === '/order' && to.path === '/create-order') router.push('/my')

  next()
})

export default router
