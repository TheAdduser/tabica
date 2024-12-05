<script setup>
import { ref, onMounted } from 'vue';
import PocketBase from 'pocketbase';
import Header from './Header.vue';
import Modal from './Modal.vue';
import { useRouter } from 'vue-router';

const pb = new PocketBase('http://127.0.0.1:8090');
const router = useRouter();

const projects = ref([]);
const newProjectName = ref('');
const errorMessage = ref('');
const showModal = ref(false);
const projectToDelete = ref(null);

const fetchProjects = async () => {
  try {
    projects.value = await pb.collection('projects').getFullList({
    });
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
    const newProject = await pb.collection('projects').create({
      name: newProjectName.value,
      owner: pb.authStore.model.id,
      assignee: pb.authStore.model.id
    });

    newProjectName.value = '';
    fetchProjects();
  } catch (error) {
    errorMessage.value = 'Failed to create project';
  }
};

const confirmDeleteProject = (project) => {
  projectToDelete.value = project;
  showModal.value = true;
};

const deleteProject = async () => {
  try {
    await pb.collection('projects').delete(projectToDelete.value.id);
    showModal.value = false;
    fetchProjects();
  } catch (error) {
    errorMessage.value = 'Failed to delete project';
  }
};

async function cancelModal() {
  try {
    showModal.value = false;
  } catch (error) {
    errorMessage.value = 'failed to cancel modal';
  }
}

const navigateToHub = (projectId) => {
  router.push(`/hub/${projectId}`);
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div>
    <Header />
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div class="flex-row w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 class="text-2xl font-bold text-center text-white">Projects</h2>
        <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
          {{ errorMessage }}
        </div>
        <ul class="space-y-2">
          <li v-for="project in projects" :key="project.id" class="text-white flex justify-between float-left w-full p-2 border-black rounded bg-gray-700 items-center">
            <div class="bg-gray-600 p-2 border-black rounded w-full text-2xl font-bold">
              <router-link :to="'/hub/' + project.id">
                <div class="break-all">{{ project.name }}</div>
              </router-link>
            </div>
            <button @click="confirmDeleteProject(project)" class="ml-4 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 float-right text-xl max-h-12">
              Delete
            </button>
          </li>
        </ul>
        <form @submit.prevent="createProject" class="space-y-4">
          <div>
            <label for="newProjectName" class="block mb-2 text-sm font-bold text-gray-300">New Project Name</label>
            <input v-model="newProjectName" type="text" id="newProjectName" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" required />
          </div>
          <button type="submit" class="px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
            Create Project
          </button>
        </form>
      </div>
    </div>
    <Modal
      :show="showModal"
      title="Delete Project"
      message="Are you sure you want to delete this project?"
      @confirm="deleteProject"
      @cancel="cancelModal"
    />
  </div>
</template>