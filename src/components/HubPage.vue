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
    <div class="flex flex-1">
      <SideBar class="h-full" />
      <div class="flex-1 p-4">
        <KanbanBoard :projectId="projectId" />
      </div>
    </div>
  </div>
</template>