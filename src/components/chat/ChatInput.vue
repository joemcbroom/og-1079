<script setup>
import DefaultButton from '@/components/DefaultButton.vue';
import GifDialog from '@/components/chat/GifDialog.vue';
import { ref } from 'vue';
const emit = defineEmits(['submitChat']);

const input = ref('');
const showGifSearch = ref(false);

const handleSubmit = () => {
  emit('submitChat', input.value);
  input.value = '';
};
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex sticky bottom-0 w-full h-14">
    <input
      type="text"
      class="w-3/4 text-zinc-800 pl-2 rounded rounded-r-none"
      placeholder="Chat..."
      v-model="input"
    />
    <DefaultButton type="submit" class="w-1/4 rounded-l-none">
      Send
    </DefaultButton>
    <gif-dialog />
  </form>
</template>
