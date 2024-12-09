import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import HubPage from './components/HubPage.vue';
import AccountOptions from './components/AccountOptions.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/hub', component: HubPage },
  { path: '/hub/:id', component: HubPage },
  { path: '/account', component: AccountOptions },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;