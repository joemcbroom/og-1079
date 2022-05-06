<script setup>
import { getAllUsers } from '@/services/supabase';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserTable from '@/components/admin/UserTable.vue';
import LoadingIcon from '../components/LoadingIcon.vue';

const router = useRouter();
const userStore = useUserStore();

const users = ref([]);

onMounted(async () => {
  setTimeout(() => {
    if (!userStore.user.isAdmin) router.push('/');
  }, 1000);
  users.value = await getAllUsers();
});

const updateUser = (user) => {
  const indexOfUser = users.value.findIndex((u) => u.id === user.id);
  users.value.splice(indexOfUser, 1, user);
};
</script>
<template>
  <h1 class="text-3xl font-bold">Super Secret Admin Page</h1>
  <div class="mt-4 bg-zinc-50 w-full rounded text-zinc-800 px-2">
    <h2 class="text-2xl font-bold">Users</h2>
    <user-table v-if="users.length" :users="users" @updateUser="updateUser" />
    <LoadingIcon v-else />
  </div>
</template>
