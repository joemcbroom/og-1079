<script setup>
import { supabase, getChats, getUserProfile } from '@/services/supabase';
import ChatContainer from '@/components/chat/ChatContainer.vue';
import { getPublicUrl } from '@/utils/publicUrl';
import { onMounted, ref } from 'vue';
import { useChatUsersStore } from '@/stores/chatUsers';
import { storeToRefs } from 'pinia';

const chats = ref([]);
const chatSubscription = ref(null);

const chatUserStore = useChatUsersStore();
const { chatUsers } = storeToRefs(chatUserStore);

onMounted(async () => {
  let data = await getChats();
  chatUsers.value = data.reduce((users, chat) => {
    const { profile } = chat;
    if (!users.find((user) => user?.id === profile.id)) {
      return [
        ...users,
        { ...profile, public_avatar_url: getPublicUrl(profile.avatar_url) },
      ];
    }
    return users;
  }, []);

  chats.value = data;

  chatSubscription.value = supabase
    .from('chats')
    .on('INSERT', async (payload) => {
      const { errors, new: newChat } = payload;
      if (errors) {
        console.error(errors);
      }
      await handleNewChat(newChat);
    })
    .subscribe();
});

const handleNewChat = async (newChat) => {
  const profileId = newChat.profile;
  const userProfile = await getUserProfile(profileId);
  const chat = {
    ...newChat,
    profile: {
      ...userProfile,
      public_avatar_url: getPublicUrl(userProfile.avatar_url),
    },
  };
  const { profile } = chat;
  if (!chatUsers.value.find((user) => user?.id === profile.id)) {
    chatUsers.value.push(profile);
  }
  chats.value.push({ ...chat, isNew: true });
};
</script>
<template>
  <chat-container :chats="chats" />
</template>
