<script setup>
import DefaultButton from '@/components/DefaultButton.vue';
import GifDialog from '@/components/chat/GifDialog.vue';
import { ref } from 'vue';
const emit = defineEmits(['submitChat']);

const input = ref('');

const handleSubmit = () => {
  emit('submitChat', input.value);
  input.value = '';
};

const handleSelectGif = (gif) => {
  const gifUrl = gif.media[0].gif.url;
  input.value = gifUrl;
};
</script>
<template>
  <form @submit.prevent class="flex absolute bottom-0 w-full h-12 mx-auto">
    <input
      type="text"
      class="w-3/4 text-zinc-800 pl-2 rounded rounded-r-none pr-12"
      placeholder="Chat..."
      v-model="input"
    />
    <DefaultButton
      @click="handleSubmit"
      type="submit"
      class="w-1/4 rounded-l-none"
    >
      Send
    </DefaultButton>
    <gif-dialog @selectGif="handleSelectGif" :query="input" />
  </form>
</template>
