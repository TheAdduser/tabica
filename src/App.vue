<script setup>
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ProjectsPage from './components/ProjectsPage.vue';
import ProjectPage from './components/ProjectPage.vue';
import PocketBase from 'pocketbase';
import { ref } from 'vue';

const pb = new PocketBase('http://127.0.0.1:8090');
const isLoggedIn = ref(pb.authStore.isValid);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/project/:id', component: ProjectPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
</script>

<template>
  <router-view />
</template>
