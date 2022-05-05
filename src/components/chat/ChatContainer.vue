<script setup>
import DefaultButton from '../DefaultButton.vue';
import { onMounted, onUnmounted } from 'vue';

import ChatBubble from './ChatBubble.vue';

const props = defineProps({
  chats: {
    type: Array,
    default: () => [],
  },
});

const resizeCallback = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', resizeCallback);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCallback);
});
</script>

<template>
  <div
    ref="wrapper"
    id="chat-wrap"
    class="flex flex-col justify-center items-stretch w-full"
  >
    <div class="w-full h-full py-10 px-6">
      <div
        class="h-full bg-zinc-50 rounded border text-zinc-800 overflow-scroll flex flex-col gap-4"
      >
        <ChatBubble
          v-for="chat in chats"
          :chat="chat"
          :key="chat.id"
          class="text-xs"
        />
      </div>
    </div>
    <div class="flex sticky bottom-0 w-full h-14">
      <input type="text" class="w-3/4" />
      <DefaultButton class="w-1/4">Send</DefaultButton>
    </div>
  </div>
</template>

<style>
#chat-wrap {
  height: calc(var(--vh, 1vh) * 100 - 81px);
}
</style>
