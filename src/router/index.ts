import { createRouter, createWebHistory } from 'vue-router'
import entrypoint from '@/components/entrypoint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: entrypoint
    }
  ]
})

export default router
