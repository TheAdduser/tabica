import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ProjectsPage from './components/ProjectsPage.vue';
import HubPage from './components/HubPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/hub', component: HubPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;