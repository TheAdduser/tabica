<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <button class="bg-gray-700" @click="count++">
   {{ msg }} {{ count }}
  </button>
</template>


