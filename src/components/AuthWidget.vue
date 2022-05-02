<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import DefaultButton from '@/components/DefaultButton.vue';

const loading = ref(false);
const emailSent = ref(false);
const email = ref('');

const { supabase } = useAuthStore();

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    emailSent.value = true;
  }
};
</script>

<template>
  <form
    class="flex flex-col gap-4 border p-6"
    v-if="!emailSent"
    @submit.prevent
  >
    <h1 class="text-center text-3xl font-bold">Login</h1>
    <p class="text-center text-lg">
      Enter your email to login or create a new account
    </p>
    <p class="text-center text-lg">
      You will recieve an email with a link to login
    </p>

    <div class="flex flex-nowrap w-3/4 mx-auto mt-6">
      <input
        type="email"
        v-model="email"
        class="text-zinc-800 border-2 border-ogGreen border-r-0 rounded rounded-r-none p-2 w-full placeholder:text-zinc-500"
        placeholder="Email"
      />
      <DefaultButton
        class="rounded-l-none w-1/2"
        :action="handleLogin"
        text="Login"
        :disabled="loading"
      />
    </div>
  </form>
  <div
    class="text-xs mt-4 flex flex-col justify-center items-center gap-2 border p-6"
    v-else
  >
    <p class="text-base">Check your email for a sign in/up link</p>
    <p @click="handleLogin">Didn't receive an email?</p>
    <p class="text-ogGreen">Click here to try again</p>
  </div>
</template>
