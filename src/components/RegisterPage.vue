<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const pb = new PocketBase('http://127.0.0.1:8090');
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const errorMessage = ref('');

const register = async () => {
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    await pb.collection('users').create({
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: password.value,
    });
    errorMessage.value = '';
    // Redirect to the login page after successful registration
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Registration failed';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
      <h1 class="text-4xl font-bold text-white text-center">Tab[<span class="text-[#40c27b]">i</span>]ca</h1>
      <h2 class="text-2xl font-bold text-center text-white">Register</h2>
      <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-bold text-gray-300">Name</label>
          <input v-model="name" type="text" id="name" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-bold text-gray-300">Email</label>
          <input v-model="email" type="email" id="email" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm font-bold text-gray-300">Password</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="mb-6">
          <label for="passwordConfirm" class="block mb-2 text-sm font-bold text-gray-300">Confirm Password</label>
          <input v-model="passwordConfirm" type="password" id="passwordConfirm" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
            Register
          </button>
          <span class="text-sm text-white">Already have an account? <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link></span>
          
        </div>
      </form>
    </div>
  </div>
</template>