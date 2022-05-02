<script setup>
import { RouterView } from 'vue-router';
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<template>
  <HeaderBar />
  <main
    class="max-w-sm h-full mx-auto flex flex-col justify-center items-center"
  >
    <RouterView />
  </main>
</template>

<style>
main {
  min-height: calc(100vh - 79.5px);
}
</style>
