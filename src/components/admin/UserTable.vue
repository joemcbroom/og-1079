<script setup>
import UserRow from '@/components/admin/UserRow.vue';

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const emit = defineEmits(['updateUser']);

const handleUpdateUser = (user) => {
  emit('updateUser', user);
};
</script>

<template>
  <div class="w-full flex flex-col my-4">
    <user-row
      v-for="user in props.users"
      :key="user.id"
      :user="user"
      @updateUser="handleUpdateUser"
    />
  </div>
</template>
