<script setup>
import ChatInput from '@/components/chat/ChatInput.vue';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { postChat, supabase } from '@/services/supabase';
import ChatBubble from './ChatBubble.vue';

defineProps({
  chats: {
    type: Array,
    default: () => [],
  },
});

const chatBox = ref(null);

const postChatToDb = async (chat) => {
  if (!chat) {
    return;
  }
  await postChat(chat);
  chatBox.value.scrollTop = chatBox.value.scrollHeight;
};

// const resizeCallback = () => {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
//   chatBox.value.scrollTop = chatBox.value.scrollHeight;
// };

const chatIsUser = (id) => {
  return id === supabase.auth.user().id;
};

// onMounted(() => {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
//   window.addEventListener('resize', resizeCallback);
// });

onUpdated(() => {
  setTimeout(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }, 800);
});

// onUnmounted(() => {
//   window.removeEventListener('resize', resizeCallback);
// });
</script>

<template>
  <div
    id="chat-wrap"
    class="flex flex-col justify-center items-stretch w-full relative"
  >
    <div class="w-full h-full pt-14 pb-16">
      <div
        ref="chatBox"
        class="h-full bg-zinc-50 rounded rounded-b-none border text-zinc-800 overflow-scroll flex flex-col py-6 gap-4 scroll-smooth"
      >
        <ChatBubble
          v-for="(chat, index) in chats"
          :chat="chat"
          :key="chat.id"
          :index="index"
          :chatIsUser="chatIsUser(chat.profile.id)"
          class="text-xs"
        />
        <div v-if="chats.length === 0">No Chats Yet!</div>
      </div>
    </div>
    <chat-input @submitChat="postChatToDb" />
  </div>
</template>

<style>
#chat-wrap {
  height: calc(var(--vh, 1vh) * 100 - 62px);
}
</style>
