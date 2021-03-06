import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/category/:main',
    component: () => import('../views/Category.vue'),
    name: 'Category',
    props: true,
    children: [
      {
        path: ':sub',
        component: () => import('../views/Category.vue'),
      }
    ]
  },
  {
    path: '/borrow/:type',
    name: 'Borrow',
    props: true,
    component: () => import('../views/Borrow.vue')
  },
  {
    path: '/item/:id',
    name: 'Item',
    props: true,
    component: () => import('../views/Item.vue')
  },
  {
    path: '/create/:type',
    name: 'Create',
    props: true,
    component: () => import('../views/Create.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
