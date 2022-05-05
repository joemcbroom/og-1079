<script setup>
import { RouterLink } from 'vue-router';
import ProfileIcon from './ProfileIcon.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>
<template>
  <header
    class="flex w-full justify-between p-4 border-0 border-b sticky top-0 bg-zinc-100 text-zinc-800 z-10"
  >
    <div class="w-24 grid place-items-center">
      <img class="" src="../assets/logo.png" alt="logo" />
    </div>
    <div class="flex justify-center items-center gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/events">Events</RouterLink>
      <RouterLink v-if="true" to="/chat">Chat</RouterLink>
    </div>
    <div class="w-24 grid place-items-center">
      <ProfileIcon :includeOptions="true" />
    </div>
  </header>
</template>
