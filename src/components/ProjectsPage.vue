<script setup>
import { ref, onMounted } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const pb = new PocketBase('http://127.0.0.1:8090');
const router = useRouter();

const projects = ref([]);
const newProjectName = ref('');
const errorMessage = ref('');

const fetchProjects = async () => {
  try {
    const result = await pb.collection('projects').getFullList({
      filter: `owner = "${pb.authStore.model.id}" || members ?= "${pb.authStore.model.id}"`,
    });
    projects.value = result;
  } catch (error) {
    errorMessage.value = 'Failed to fetch projects';
  }
};

const createProject = async () => {
  if (!newProjectName.value) {
    errorMessage.value = 'Project name is required';
    return;
  }

  try {
    await pb.collection('projects').create({
      name: newProjectName.value,
      owner: pb.authStore.model.id,
      members: [pb.authStore.model.id],
    });
    newProjectName.value = '';
    fetchProjects();
  } catch (error) {
    errorMessage.value = 'Failed to create project';
  }
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded shadow-md">
      <h2 class="text-2xl font-bold text-center text-white">Projects</h2>
      <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
        {{ errorMessage }}
      </div>
      <div class="space-y-4">
        <div v-for="project in projects" :key="project.id" class="p-4 bg-gray-700 rounded">
          <h3 class="text-xl font-bold text-white">{{ project.name }}</h3>
          <button @click="() => router.push(`/project/${project.id}`)" class="mt-2 px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
            Open Project
          </button>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="text-xl font-bold text-white">Create New Project</h3>
        <input v-model="newProjectName" type="text" placeholder="Project Name" class="w-full px-3 py-2 mt-2 border-black rounded bg-gray-700 text-white" />
        <button @click="createProject" class="mt-2 px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
          Create Project
        </button>
      </div>
    </div>
  </div>
</template>