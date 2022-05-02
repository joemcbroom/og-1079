<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import DefaultButton from '@/components/DefaultButton.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import useUserStore from '@/stores/user';
import { useAuthStore } from '@/stores/auth';

const { supabase } = useAuthStore();

const store = useUserStore();
const { user } = storeToRefs(store);

onMounted(() => {
  const authenticatedUser = supabase.auth.user();
  if (authenticatedUser) {
    user.value = authenticatedUser;
  }
});

const showOptions = ref(false);
const toggleShowOptions = () => {
  showOptions.value = !showOptions.value;
};
</script>
<template>
  <div class="w-3/4 grid place-items-center relative">
    <img
      class="w-10 cursor-pointer"
      src="../assets/profile-user.png"
      alt="profile"
      @click="toggleShowOptions"
    />
    <div
      class="flex flex-col min-w-max border shadow-lg rounded absolute top-full right-0 bg-zinc-100 mt-2 py-5 px-10"
      v-show="showOptions"
    >
      <DefaultButton @click="toggleShowOptions" v-if="!user.id">
        <router-link to="/auth">Sign In</router-link>
      </DefaultButton>

      <router-link
        class="text-ogGreen font-bold"
        @click="toggleShowOptions"
        to="/profile"
        v-else
      >
        View Profile
      </router-link>
    </div>
  </div>
</template>
