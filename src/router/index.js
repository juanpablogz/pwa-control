import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Index from '../views/Index.vue'
import SignIn from '../views/SignIn.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { auth: true },
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: { auth: true },
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/home', '/signIn', '/admin']
  const authRequired = !publicPages.includes(to.path)
  const logeedIn = JSON.parse(localStorage.getItem('token'));
  if (to.meta.auth) {
    if (authRequired && logeedIn['access-token'] !== undefined) {
      return next()
    }else if (authRequired && logeedIn['access-token'] === undefined) {
      return next('/home')
    }
  }
  next()
})

export default router
