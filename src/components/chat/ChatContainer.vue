<script setup>
import ChatInput from '@/components/chat/ChatInput.vue';
import { onUpdated, ref } from 'vue';
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

const chatIsUser = (id) => {
  return id === supabase.auth.user().id;
};

onUpdated(() => {
  setTimeout(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }, 800);
});
</script>

<template>
  <div
    id="chat-wrap"
    class="flex flex-col justify-center items-stretch w-full relative overflow-hidden rounded rounded-b-none"
  >
    <div class="w-full h-full mt-8 pb-14">
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
