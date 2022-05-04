<script setup>
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import ProfileImage from '@/assets/profile-user.png';
import { ref, watch } from 'vue';
import DefaultButton from '@/components/DefaultButton.vue';

const { supabase, signOut } = useAuthStore();
const userStore = useUserStore();

const showOptions = ref(false);
const imageSrc = ref(ProfileImage);

defineProps({
  includeOptions: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => userStore.profileImagePublicURL,
  (newValue) => {
    imageSrc.value = newValue || ProfileImage;
  },
  { immediate: true }
);

const toggleShowOptions = () => {
  showOptions.value = !showOptions.value;
};
</script>
<template>
  <div class="w-1/2 grid place-items-center relative">
    <span
      class="overflow-hidden w-full rounded-full border border-zinc-500 aspect-square grid place-items-center bg-cover bg-center bg-no-repeat"
      :class="{ 'cursor-pointer': includeOptions }"
      :style="`background-image: url(${imageSrc})`"
      @click="toggleShowOptions"
    />

    <div
      class="flex flex-col min-w-max border shadow-lg rounded absolute top-full right-0 bg-zinc-100 mt-2 py-5 px-10 z-20"
      v-show="includeOptions && showOptions"
    >
      <DefaultButton @click="toggleShowOptions" v-if="!supabase.auth.user()">
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
      <default-button @click="signOut" v-if="supabase.auth.user()">
        Sign Out
      </default-button>
    </div>
  </div>
</template>
