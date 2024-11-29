<script setup>
import loginPage from './components/loginPage.vue'
import PocketBase from 'pocketbase';
import { ref } from 'vue';

const pb = new PocketBase('http://127.0.0.1:8090');
let isLoggedIn = ref(pb.authStore.isValid);
console.log(pb.authStore.isValid);
</script>

<template>
  <loginPage msg={{isLoggedIn}} />
</template>
