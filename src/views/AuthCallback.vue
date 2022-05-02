<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import useUserStore from '../stores/user';
import LoadingIcon from '@/components/LoadingIcon.vue';
import { useRouter } from 'vue-router';
import { onMounted, onUpdated } from 'vue';
const router = useRouter();
const { supabase } = useAuthStore();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onUpdated(() => {
  if (supabase.auth.user()) {
    const { id, email } = supabase.auth.user();
    console.log(
      'arrived on callback page with an existing user, so going home'
    );
    setTimeout(() => {
      userStore.$state = {
        user: {
          id,
          email,
        },
      };
      router.push('/profile');
    }, 0);
  }
});
</script>
<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
