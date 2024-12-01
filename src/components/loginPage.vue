<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

defineProps({
  msg: String,
})

const count = ref(0)

const pb = new PocketBase('http://127.0.0.1:8090')
const router = useRouter();

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  try {
    await pb.collection('users').authWithPassword(email.value, password.value)
    errorMessage.value = ''
    // Redirect to the main page or update the state to show the Kanban board
  } catch (error) {
    errorMessage.value = 'Invalid email or password'
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
      <h1 class="text-4xl font-bold text-white text-center">Tab[<span class="text-[#40c27b]">i</span>]ca</h1>
      <h2 class="text-2xl font-bold text-center text-white">Login</h2>
      <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-bold text-gray-300">Email</label>
          <input v-model="email" type="email" id="email" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-bold text-gray-300">Password</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
            Login
          </button>
          <span class="text-sm text-white">Don't have an account? <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>
