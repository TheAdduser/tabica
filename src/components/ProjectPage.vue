<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase from 'pocketbase';
import Header from './Header.vue';
import { DndContext } from '@dnd-kit/core';
import { handleDragEnd } from '../directives/dragAndDrop';

const pb = new PocketBase('http://127.0.0.1:8090');
const route = useRoute();
const projectId = route.params.id;
const project = ref(null);
const columns = ref([]);
const errorMessage = ref('');

const fetchProject = async () => {
  try {
    project.value = await pb.collection('projects').getOne(projectId);
  } catch (error) {
    errorMessage.value = 'Failed to fetch project';
  }
};

const fetchColumns = async () => {
  try {
    columns.value = await pb.collection('status').getFullList({
      filter: `project = "${projectId}"`,
      sort: 'columnOrder',
    });
  } catch (error) {
    errorMessage.value = 'Failed to fetch columns';
  }
};

onMounted(() => {
  fetchProject();
  fetchColumns();
});
</script>

<template>
  <div>
    <Header />
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div v-if="project" class="w-full max-w-5xl p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 class="text-2xl font-bold text-center text-white">{{ project.name }}</h2>
        <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
          {{ errorMessage }}
        </div>
        <DndContext @dragend="(event) => handleDragEnd(event, columns, pb)">
          <div class="flex space-x-4">
            <div
              v-for="column in columns"
              :key="column.id"
              class="w-64 p-4 bg-gray-700 rounded shadow-md"
              :data-id="column.id"
              v-drag-and-drop
            >
              <h3 class="text-xl font-bold text-white">{{ column.name }}</h3>
              <!-- Add tasks here -->
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  </div>
</template>