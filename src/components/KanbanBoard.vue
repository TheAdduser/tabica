<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PocketBase from 'pocketbase';
import { defineProps } from 'vue';

const pb = new PocketBase('http://127.0.0.1:8090');
const route = useRoute();
const props = defineProps({
  projectId: String,
});
const columns = ref([]);
const tasks = ref([]);
const errorMessage = ref('');

const fetchColumns = async () => {
  try {
    columns.value = await pb.collection('projects').getFullList({
      expand: 'columns',
    });
    console.log('Fetched columns:', columns.value);
  } catch (error) {
    errorMessage.value = 'Failed to fetch columns';
  }
};

const fetchTasks = async () => {
  try {
    tasks.value = await pb.collection('columns').getFullList({
      expand: 'tasks',
    });
    console.log('Fetched tasks:', tasks.value);
  } catch (error) {
    errorMessage.value = 'Failed to fetch tasks';
  }
};

watch(() => props.projectId, () => {
  fetchColumns();
  fetchTasks();
});

onMounted(() => {
  fetchColumns();
  fetchTasks();
});
</script>

<template>
  <div>
    <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
      {{ errorMessage }}
    </div>
    <div class="flex space-x-4">
      <div
        v-for="column in columns.column"
        :key="column"
        class="w-64 p-4 bg-gray-700 rounded shadow-md"
      >
        <h3 class="text-xl font-bold text-white">{{ column.name }}</h3>
        <div class="space-y-2 mt-4">
          <div
            v-for="task in tasks.tasks"
            :key="task"
            class="p-2 bg-gray-600 rounded text-white"
          >
            {{ task.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>