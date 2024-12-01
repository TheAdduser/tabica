<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase from 'pocketbase';
import Header from './Header.vue';

const pb = new PocketBase('http://127.0.0.1:8090');
const route = useRoute();
const projectId = route.params.id;
const project = ref(null);
const errorMessage = ref('');

const fetchProject = async () => {
  try {
    project.value = await pb.collection('projects').getOne(projectId);
  } catch (error) {
    errorMessage.value = 'Failed to fetch project';
  }
};

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div>
    <Header />
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div v-if="project" class="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 class="text-2xl font-bold text-center text-white">{{ project.name }}</h2>
        <!-- Add your project details here -->
      </div>
      <div v-else class="text-white">{{ errorMessage }}</div>
    </div>
  </div>
</template>