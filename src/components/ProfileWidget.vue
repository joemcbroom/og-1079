<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { onMounted, ref, watch } from 'vue';
import DefaultButton from './DefaultButton.vue';
import StyledInput from './StyledInput.vue';
import router from '../router';
import AvatarUpload from './AvatarUpload.vue';
const loading = ref(false);
const { supabase, signOut } = useAuthStore();

const userStore = useUserStore();

const updateProfile = async (newAvatarUrl) => {
  try {
    loading.value = true;
    const { id } = supabase.auth.user();
    if (newAvatarUrl) {
      userStore.user.avatar_url = newAvatarUrl;
      await userStore.setUser(supabase);
    }
    const updates = {
      id,
      ...userStore.user,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const updateAvatar = async (avatar_url) => {
  try {
    loading.value = true;
    const { id } = supabase.auth.user();
    const updates = {
      id,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);
    const { publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(avatar_url);
    userStore.profileImagePublicURL = publicURL;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// onMounted(() => {
//   if (!supabase.auth.user()) return router.push('/auth');
// });
</script>
<template>
  <h1 class="text-center text-3xl">Update Profile Info</h1>

  <form
    class="flex flex-col justify-center items-start gap-5 border p-6 w-full mt-4"
    @submit.prevent
  >
    <avatar-upload class="self-center" @upload="updateAvatar" />
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
