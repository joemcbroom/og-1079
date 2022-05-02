<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import useUserStore from '../stores/user';
const router = useRouter();
const { supabase } = useAuthStore();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(() => {
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
