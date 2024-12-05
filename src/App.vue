<script setup>
import PocketBase from 'pocketbase';
import { ref } from 'vue';
import router from './router';

const pb = new PocketBase('http://127.0.0.1:8090');
const isLogged = ref(pb.authStore.isValid);

if (isLogged.value) {
  router.push('/projects')
}
else {
  router.push('/login')
}
</script>


<template>
  <router-view />
</template>
