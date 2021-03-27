import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Release from '../components/Release.vue'
import Myrelease from '../components/Myrelease.vue'
import Collection from '../components/Collection.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, },
  { path: '/release', component: Release, },
  { path: '/myrelease', component: Myrelease, },
  { path: '/collection', component: Collection, },
  { path: '/register', component: Register, },
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to将要访问的路径 from从哪个路径跳转而来 next是一个函数，表示放行 next()  next('./login)强制跳转
//   if (to.path === '/login') return next();
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token');
//   if (!tokenStr) return next('/login')
//   next();
// });

export default router
