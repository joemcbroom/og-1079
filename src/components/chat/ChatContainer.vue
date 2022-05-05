<script setup>
import DefaultButton from '../DefaultButton.vue';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { postChat } from '@/services/supabase';
import ChatBubble from './ChatBubble.vue';

const props = defineProps({
  chats: {
    type: Array,
    default: () => [],
  },
});

const input = ref('');
const chatBox = ref(null);

const submitChat = async () => {
  const chat = input.value;
  if (!chat) {
    return;
  }
  await postChat(chat);
  chatBox.value.scrollTop = chatBox.value.scrollHeight;
  input.value = '';
};

const resizeCallback = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  chatBox.value.scrollTop = chatBox.value.scrollHeight;
};

onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', resizeCallback);
});

onUpdated(() => {
  setTimeout(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }, 800);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCallback);
});
</script>

<template>
  <div id="chat-wrap" class="flex flex-col justify-center items-stretch w-full">
    <div class="w-full h-full py-10 px-6">
      <div
        ref="chatBox"
        class="h-full bg-zinc-50 rounded border text-zinc-800 overflow-scroll flex flex-col py-4 gap-4 scroll-smooth"
      >
        <ChatBubble
          v-for="chat in chats"
          :chat="chat"
          :key="chat.id"
          class="text-xs"
        />
      </div>
    </div>
    <form @submit.prevent="submitChat" class="flex sticky bottom-0 w-full h-14">
      <input
        v-model="input"
        type="text"
        class="w-3/4 text-zinc-800 pl-2 rounded rounded-r-none"
        placeholder="Chat..."
      />
      <DefaultButton type="submit" class="w-1/4 rounded-l-none"
        >Send</DefaultButton
      >
    </form>
  </div>
</template>

<style>
#chat-wrap {
  height: calc(var(--vh, 1vh) * 100 - 62px);
}
</style>
