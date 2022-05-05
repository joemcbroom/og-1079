<script setup>
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const { supabase } = useAuthStore();
</script>
<template>
  <h1 class="text-3xl mb-4">OG 1079 Reunion</h1>
  <h2 class="text-2xl mb-4">Welcome to the site!</h2>
  <p class="text-lg mb-4">We'll use this to organize OG 1079 Reunion events.</p>
  <router-link to="/auth" v-if="!supabase.auth.currentSession">
    <a class="text-ogGreen text-bold text-lg"
      >Click Here to Sign In or Create Account</a
    >
  </router-link>
</template>
