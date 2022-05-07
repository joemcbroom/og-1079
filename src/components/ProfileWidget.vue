<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import DefaultButton from './DefaultButton.vue';
import StyledInput from './StyledInput.vue';
import AvatarUpload from './AvatarUpload.vue';
import { updateProfile } from '@/services/supabase';
import ColorPicker from './ColorPicker.vue';

const loading = ref(false);
const showColorPicker = ref(false);

const { supabase, signOut } = useAuthStore();

const userStore = useUserStore();

const handleUpdateProfile = async () => {
  const id = supabase.auth.user().id;
  const user = userStore.user;
  loading.value = true;
  await updateProfile({ ...user, id });
  loading.value = false;
};

const handleUpdateAvatar = async (avatar_url) => {
  const { id } = supabase.auth.user();
  loading.value = true;
  await updateProfile({ id, avatar_url });
  userStore.user.avatar_url = avatar_url;
  loading.value = false;
};

const handleUpdateUserColor = async (color) => {
  const { id } = supabase.auth.user();
  showColorPicker.value = false;
  loading.value = true;
  await updateProfile({ id, color });
  userStore.user.color = color;
  loading.value = false;
};
</script>
<template>
  <h1 class="text-3xl">Update Profile Info</h1>

  <form
    class="flex flex-col justify-center items-start gap-5 border p-6 w-full mt-4"
    @submit.prevent
  >
    <avatar-upload class="self-center" @upload="handleUpdateAvatar" />
    <color-picker
      v-if="showColorPicker"
      :userColor="userStore.userColor"
      @updateColor="handleUpdateUserColor"
    />
    <div
      class="flex items-center justify-center w-full gap-2 text-xs relative"
      v-else
    >
      Your Color:
      <span
        class="w-8 h-8 aspect-square relative rounded overflow-hidden border border-zinc-50"
        :style="{ background: userStore.userColor }"
        @click="showColorPicker = true"
      />
    </div>
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
      <default-button class="w-full" @click="handleUpdateProfile">
        Update Profile
      </default-button>
      <default-button class="w-full" @click="signOut">
        Sign Out
      </default-button>
    </div>
  </form>
</template>
