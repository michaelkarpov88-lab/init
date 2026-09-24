import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Главная' } },
    // Ленивая загрузка: код страниц подгружается только при переходе
    { path: '/projects', name: 'projects', component: () => import('./views/ProjectsView.vue'), meta: { title: 'Проекты' } },
    { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue'), meta: { title: 'Связаться' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue'), meta: { title: '404' } },
  ],
  scrollBehavior: (to, from, saved) => saved ?? { top: 0, behavior: 'smooth' },
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · Портфолио`
})

export default router
