<script setup>
import { useAuthStore } from '@/stores/auth';
import useUserStore from '../stores/user';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

const router = useRouter();
const { supabase } = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
  debugger;
  if (supabase.auth.user()) {
    console.log(
      'arrived on callback page with an existing user, so going home'
    );
    userStore.$patch({
      id: supabase.auth.user().id,
      isAuthenticated: true,
    });
    setTimeout(() => {
      router.push('/profile');
    }, 10);
  }
});
</script>
<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
