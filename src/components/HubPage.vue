<script setup>
import Header from './Header.vue';
import SideBar from './SideBar.vue';
import KanbanBoard from './KanbanBoard.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = ref(route.params.id);

watch(() => route.params.id, (newId) => {
  projectId.value = newId;
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <Header />
    <div class="flex flex-1 gap-4">
      <SideBar/>
        <div v-if="projectId">
          <KanbanBoard :projectId="projectId" />
        </div>
        <div v-else class="flex items-center justify-center h-full text-white">
          <p>Please choose a project from the sidebar to proceed.</p>
        </div>
    </div>
  </div>
</template>