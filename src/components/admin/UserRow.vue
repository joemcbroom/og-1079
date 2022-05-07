<script setup>
import { getPublicUrl } from '@/utils/publicUrl';
import { updateProfile } from '@/services/supabase';
import ProfileImage from '@/assets/profile-user.png';
import AddIcon from '@/assets/add.png';
import MinusIcon from '@/assets/minus.png';
import { computed, ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['updateUser']);

const showDetails = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

const toggleSwitchSrc = computed(() => {
  return showDetails.value ? MinusIcon : AddIcon;
});

const handleMakeAdmin = async () => {
  const id = props.user.id;
  await updateProfile({ id, isAdmin: true });
  emit('updateUser', { ...props.user, isAdmin: true });
};
</script>

<template>
  <div class="border-b py-2 overflow-hidden text-xs">
    <div class="grid grid-cols-12 items-center">
      <div class="col-span-1 grid place-items-center">
        <img
          class="cursor-pointer"
          :src="toggleSwitchSrc"
          @click="toggleDetails"
        />
      </div>
      <div class="col-span-1 grid place-items-center">
        <img
          :src="
            props.user.avatar_url
              ? getPublicUrl(props.user.avatar_url)
              : ProfileImage
          "
          class="w-full aspect-square rounded-full object-cover"
        />
      </div>
      <div class="col-span-3">
        <span :class="!user.username && 'text-zinc-300'">
          {{ user.username || 'no-name' }}
        </span>
      </div>
      <div class="col-span-7">
        <span :class="!user.email && 'text-zinc-300'">
          {{ user.email || 'no-email' }}
        </span>
      </div>
    </div>

    <div
      class="transition-all transform origin-top duration-300 grid grid-cols-12 items-center text-[10px]"
      :class="showDetails ? 'scale-y-100 max-h-20' : 'scale-y-0 max-h-0'"
    >
      <div class="col-span-3 flex flex-col justify-center items-start">
        <span class="font-bold">Description:</span>
        <span :class="!user.description && 'text-zinc-300'">
          {{ user.description || 'no-description' }}
        </span>
      </div>
      <div class="col-span-3 flex flex-col justify-center items-start">
        <span class="font-bold">Is Admin?</span>
        <span>
          {{ user.isAdmin ? 'Yes' : 'No' }}
        </span>
      </div>
      <div class="col-span-3 flex flex-col justify-center items-start">
        <span class="font-bold">Phone</span>
        <span :class="!user.phone && 'text-zinc-300'">
          {{ user.phone || 'no-phone' }}
        </span>
      </div>
      <div
        class="col-span-3 flex flex-col justify-center items-center"
        v-if="!user.isAdmin"
      >
        <span class="font-bold">Make Admin</span>
        <button @click="handleMakeAdmin" class="bg-ogGreen p-2 rounded">
          <img :src="AddIcon" />
        </button>
      </div>
    </div>
  </div>
</template>
