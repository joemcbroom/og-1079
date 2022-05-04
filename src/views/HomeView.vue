<script setup>
import AuthWidget from '@/components/AuthWidget.vue';
import { useAuthStore } from '@/stores/auth';

const { supabase } = useAuthStore();
</script>
<template>
  <h1 class="text-center text-3xl mb-4">OG 1079 Reunion</h1>
  <h2 class="text-center text-2xl mb-4">Welcome to the site!</h2>
  <p class="text-center text-lg">
    We'll use this to organize OG 1079 Reunion events.
  </p>
  <AuthWidget v-if="!supabase.auth.user()" />
</template>
