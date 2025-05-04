import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/MainPage.vue'
import Join from './components/Join.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/join', component: Join },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 