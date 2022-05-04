<script setup>
import { ref, toRefs, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

import ProfileIcon from './ProfileIcon.vue';

const { supabase } = useAuthStore();

const uploading = ref(false);
const files = ref();

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);
    if (uploadError) throw uploadError;
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center border border-zinc-100 rounded mt-4"
  >
    <div class="w-full relative">
      <ProfileIcon class="rounded-full w-24 h-24 m-5" />
      <label
        for="single"
        class="absolute cursor-pointer bottom-0 right-0 text-lg border w-6 h-6 grid place-items-center bg-zinc-100"
      >
        <img src="@/assets/add.png" />
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
