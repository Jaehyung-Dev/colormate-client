import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Join from '../views/Join.vue'
import Login from '../views/Login.vue'
import Feedback from '../views/Feedback.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/join', component: Join },
  { path: '/login', component: Login },
  { path: '/feedback', component: Feedback }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 