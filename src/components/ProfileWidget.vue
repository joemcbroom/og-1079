<script setup>
import useUserStore from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, ref } from 'vue';
import DefaultButton from './DefaultButton.vue';
import router from '../router';

const loading = ref(false);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { supabase } = useAuthStore();

const username = ref('');
const description = ref('');
const avatar_url = ref('');
const phone = ref('');

const getProfile = async () => {
  try {
    loading.value = true;

    let { data, error, status } = await supabase
      .from('profiles')
      .select('username, description, avatar_url, phone, isAdmin')
      .eq('id', user.value.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      description.value = data.description;
      avatar_url.value = data.avatar_url;
      phone.value = data.phone;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;

    const updates = {
      id: user.value.id,
      username: username.value,
      description: description.value,
      avatar_url: avatar_url.value,
      phone: phone.value,
      updated_at: new Date(),
    };

    let {
      data: [response],
      error,
    } = await supabase.from('profiles').upsert(updates);
    if (response) {
      user.value = { response, ...user.value };
    }

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
    userStore.$reset();
    router.push('/auth');
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (supabase.auth.user()) return router.push('/auth');
  getProfile();
});
</script>
<template>
  <h1 class="text-center text-3xl">Update Profile Info</h1>
  <form
    class="flex flex-col justify-center items-start gap-5 border p-6 w-full mt-4"
    @submit.prevent
  >
    <label class="w-full">
      <span class="text-lg">Email</span>
      <input
        class="bg-zinc-800 text-zinc-400 w-full border-0 pt-2"
        id="email"
        type="text"
        :value="userStore.user.email"
        disabled
      />
    </label>
    <label class="w-full">
      <span class="text-lg">Phone</span>
      <input
        class="bg-zinc-800 w-full border-0 border-b border-b-ogGreen pt-2"
        id="phone"
        type="tel"
        v-model="phone"
      />
    </label>
    <label class="w-full">
      <span class="text-lg">Name</span>
      <input
        class="bg-zinc-800 w-full border-0 border-b border-b-ogGreen pt-2"
        id="username"
        type="text"
        v-model="username"
      />
    </label>
    <label class="w-full">
      <span class="text-lg">Description</span>
      <textarea
        class="bg-zinc-800 w-full border-0 border-b border-b-ogGreen pt-2"
        id="website"
        type="website"
        v-model="description"
      />
    </label>

    <div class="w-full flex gap-1">
      <default-button
        class="w-full"
        :action="updateProfile"
        :disabled="loading"
      >
        Update Profile
      </default-button>
      <default-button class="w-full" :action="signOut" :disabled="loading">
        Sign Out
      </default-button>
    </div>
  </form>
</template>
