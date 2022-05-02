<script setup>
import { RouterLink } from 'vue-router';
import ProfileIcon from './ProfileIcon.vue';
</script>
<template>
  <header
    class="flex w-full justify-between p-4 border-0 border-b sticky top-0 bg-zinc-100 text-zinc-800"
  >
    <div class="w-24 grid place-items-center">
      <img class="" src="../assets/logo.png" alt="logo" />
    </div>
    <div class="flex justify-center items-center gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/events">Events</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
    </div>
    <div class="w-24 grid place-items-center">
      <ProfileIcon />
    </div>
  </header>
</template>
