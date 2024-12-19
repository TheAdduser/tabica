<script setup>
import { ref, watch } from 'vue';
import PocketBase from 'pocketbase';
import { defineProps } from 'vue';

const pb = new PocketBase('http://127.0.0.1:8090');

const props = defineProps({
  projectId: String,
});
const columns = ref([]);
const tasks = ref([]);
const errorMessage = ref('');


const fetchData = async () => {
  try {
    columns.value = await pb.collection('projects').getOne(props.projectId,{
      expand: 'column.task',
    });

    console.log('Fetched columns:', columns.value);
  }
  catch (error) {
    errorMessage.value = 'Failed to fetch columns';
  }
  };


watch(() => props.projectId, () => {
  if (typeof(props.projectId) !== 'undefined') {
    fetchData();
  }
});

</script>

<template>
  <div>
    <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
      {{ errorMessage }}
    </div>
    <div class="space-x-4 overflow-scroll">
       <div class="flex flex-row gap-6 " v-if="columns.length!=0">
        <div
          v-for="column in columns.expand.column"
          :key="column"
          class="p-4 bg-gray-700 rounded shadow-md min-w-44"
        >
          <h3 class="text-xl font-bold text-white">{{ column.name }}</h3>
          <div class="space-y-2 mt-4">
            <div
              v-for="task in column.expand.task"
              :key="task"
              class="p-2 bg-gray-600 rounded text-white min-h-30"
            >
              {{ task.name }}

              <!-- 
              priority if else with 3 icons
              assigne with avatar if empty leave empty
              if clicked on task show modal with task details
              -->
            </div>
          
          </div>
        </div>
      </div>
    </div>
        
  </div>
</template>