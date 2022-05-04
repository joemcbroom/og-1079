<script setup>
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import ProfileImage from '@/assets/profile-user.png';
import { ref, watch } from 'vue';
import DefaultButton from '@/components/DefaultButton.vue';

const { supabase } = useAuthStore();
const userStore = useUserStore();

const showOptions = ref(false);
const imageSrc = ref(ProfileImage);

watch(
  () => userStore.profileImagePublicURL,
  (newValue) => {
    imageSrc.value = newValue;
  },
  { immediate: true }
);

const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
  }
};

const toggleShowOptions = () => {
  showOptions.value = !showOptions.value;
};
</script>
<template>
  <div
    class="w-1/2 aspect-square grid place-items-center relative rounded-full border border-zinc-500 p-2"
  >
    <img
      class="w-full cursor-pointer"
      :src="imageSrc"
      alt="profile"
      @click="toggleShowOptions"
    />
    <div
      class="flex flex-col min-w-max border shadow-lg rounded absolute top-full right-0 bg-zinc-100 mt-2 py-5 px-10"
      v-show="showOptions"
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
