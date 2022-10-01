import { createRouter, createWebHistory } from 'vue-router'
import VHomePage from '@/pages/home/VHomePage.vue'
import VSalesPage from '@/pages/sales/VSalesPage.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VHomePage,
      meta:{layout:'main-layout'},

    },
    {
      path: '/sales',
      name: 'sales',
      meta:{layout:'main-layout'},
      component:VSalesPage

    }
  ]
})

export default router
