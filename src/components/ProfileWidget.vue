<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { onMounted, ref, watch } from 'vue';
import DefaultButton from './DefaultButton.vue';
import StyledInput from './StyledInput.vue';
import router from '../router';
import AvatarUpload from './AvatarUpload.vue';
const loading = ref(false);
const { supabase } = useAuthStore();

const userStore = useUserStore();

const updateProfile = async () => {
  try {
    loading.value = true;
    const { id } = supabase.auth.user();
    const updates = {
      id,
      ...userStore.user,
      updated_at: new Date(),
    };

    debugger;

    let { error } = await supabase.from('profiles').upsert(updates);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const signOut = async () => {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!supabase.auth.user()) return router.push('/auth');
});
</script>
<template>
  <h1 class="text-center text-3xl">Update Profile Info</h1>

  <form
    class="flex flex-col justify-center items-start gap-5 border p-6 w-full mt-4"
    @submit.prevent
  >
    <avatar-upload class="self-center" @upload="updateProfile" />
    <styled-input
      label="Email"
      id="email"
      v-model="supabase.auth.user().email"
      :disabled="true"
    />

    <styled-input label="Phone" id="phone" v-model="userStore.user.phone" />

    <styled-input
      label="Username"
      id="username"
      v-model="userStore.user.username"
    />
    <label class="w-full">
      <span class="text-lg">Description</span>
      <textarea
        class="bg-zinc-800 w-full border-0 border-b border-b-ogGreen pt-2"
        id="website"
        type="website"
        v-model="userStore.user.description"
      />
    </label>

    <div class="w-full flex gap-1">
      <default-button class="w-full" :action="updateProfile">
        Update Profile
      </default-button>
      <default-button class="w-full" :action="signOut">
        Sign Out
      </default-button>
    </div>
  </form>
</template>
