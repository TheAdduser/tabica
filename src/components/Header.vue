<script setup>
import { useRouter } from 'vue-router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const router = useRouter();

const logout = () => {
  pb.authStore.clear();
  router.push('/');
};
</script>

<template>
  <header class="w-full bg-gray-800 p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-white">Tab[<span class="text-[#40c27b]">i</span>]ca</h1>
    <button @click="logout" class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
      Logout
    </button>
  </header>
</template>