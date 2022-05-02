<script setup>
import { useAuthStore } from '@/stores/auth';
import LoadingIcon from '@/components/LoadingIcon.vue';
import { useRouter } from 'vue-router';
import { onUpdated } from 'vue';
const router = useRouter();
const { supabase } = useAuthStore();

onUpdated(() => {
  if (supabase.auth.user()) {
    console.log(
      'arrived on callback page with an existing user, so going home'
    );
    setTimeout(() => {
      router.push('/profile');
    }, 0);
  }
});
</script>
<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
