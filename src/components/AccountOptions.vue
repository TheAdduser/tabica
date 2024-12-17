<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const pb = new PocketBase('http://127.0.0.1:8090');
const router = useRouter();

const user = ref(pb.authStore.model);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const avatarFile = ref(null);
const name = ref(user.value.name);

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    await pb.collection('users').update(user.value.id, {
      oldPassword: currentPassword.value,
      password: newPassword.value,
      passwordConfirm: confirmPassword.value,
    });
    successMessage.value = 'Password updated successfully';
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Failed to update password';
    successMessage.value = '';
  }
};

const handleFileChange = (event) => {
  avatarFile.value = event.target.files[0];
};

const handleDrop = (event) => {
  event.preventDefault();
  avatarFile.value = event.dataTransfer.files[0];
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const updateAvatar = async () => {
  if (!avatarFile.value) {
    errorMessage.value = 'Please select an avatar file';
    return;
  }

  const formData = new FormData();
  formData.append('avatar', avatarFile.value);

  try {
    await pb.collection('users').update(user.value.id, formData);
    successMessage.value = 'Avatar updated successfully';
    errorMessage.value = '';
    user.value = await pb.collection('users').getOne(pb.authStore.model.id);
  } catch (error) {
    errorMessage.value = 'Failed to update avatar';
    successMessage.value = '';
  }
};

const updateProfile = async () => {
  try {
    await pb.collection('users').update(user.value.id, {
      name: name.value,
    });
    successMessage.value = 'Profile updated successfully';
    errorMessage.value = '';
    user.value = await pb.collection('users').getOne(pb.authStore.model.id);
  } catch (error) {
    errorMessage.value = 'Failed to update profile';
    successMessage.value = '';
  }
};

const goToHub = () => {
  router.push('/hub');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
      <h2 class="text-2xl font-bold text-center text-white">Account Options</h2>
      <div v-if="errorMessage" class="p-2 text-red-600 bg-red-100 rounded">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="p-2 text-green-600 bg-green-100 rounded">
        {{ successMessage }}
      </div>
      <div class="space-y-4">
        <div>
          <label for="name" class="block mb-2 text-sm font-bold text-gray-300">Name</label>
          <input v-model="name" type="text" id="name" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" />
        </div>
        <button @click="updateProfile" class="w-full px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
          Update Profile
        </button>
        <div>
          <label class="block mb-2 text-sm font-bold text-gray-300">Avatar</label>
          <div
            class="w-full p-4 border-2 border-dashed border-gray-500 rounded bg-gray-700 text-white text-center"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @click="$refs.fileInput.click()"
          >
            <input type="file" class="hidden" @change="handleFileChange" ref="fileInput" />
            <p v-if="!avatarFile">Drag and drop an avatar image here, or click to select a file</p>
            <p v-else>{{ avatarFile.name }}</p>
          </div>
          <button @click="updateAvatar" class="w-full px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a] mt-4">
            Update Avatar
          </button>
        </div>
        <div>
          <label for="currentPassword" class="block mb-2 text-sm font-bold text-gray-300">Current Password</label>
          <input v-model="currentPassword" type="password" id="currentPassword" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" />
        </div>
        <div>
          <label for="newPassword" class="block mb-2 text-sm font-bold text-gray-300">New Password</label>
          <input v-model="newPassword" type="password" id="newPassword" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" />
        </div>
        <div>
          <label for="confirmPassword" class="block mb-2 text-sm font-bold text-gray-300">Confirm New Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="w-full px-3 py-2 border-black rounded bg-gray-700 text-white" />
        </div>
        <button @click="updatePassword" class="w-full px-4 py-2 font-bold text-white bg-[#40c27b] rounded hover:bg-[#2f8f5a]">
          Update Password
        </button>
        <button @click="goToHub" class="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 mt-4">
          Back to Hub
        </button>
      </div>
    </div>
  </div>
</template>