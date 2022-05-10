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
  <form
    @submit.prevent
    class="flex sticky bottom-0 w-full h-16 mx-auto border-t border-zinc-800"
  >
    <input
      type="text"
      class="w-1/2 text-zinc-800 bg-zinc-50 pl-2 rounded rounded-r-none rounded-t-none outline-none"
      placeholder="Chat..."
      v-model="input"
    />
    <gif-dialog @selectGif="handleSelectGif" :query="input" />
    <DefaultButton
      @click="handleSubmit"
      type="submit"
      class="w-1/3 rounded-l-none rounded-t-none"
    >
      Send
    </DefaultButton>
  </form>
</template>
