<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
    <div class="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-white">{{ title }}</h2>
      <p class="mb-4 text-white">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="handleCancel" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
        <button @click="handleConfirm" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  </div>
</template>