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

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}

const randomColor = (chat) => {
  const id = chat.profile.id;
  const hex = `#${intToRGB(hashCode(id))}`;
  return hex;
};

onMounted(async () => {
  let data = await getChats();
  chatUsers.value = data.reduce((users, chat) => {
    const { profile } = chat;
    if (!users.find((user) => user?.id === profile.id)) {
      return [
        ...users,
        {
          ...profile,
          public_avatar_url: getPublicUrl(profile.avatar_url),
          color: profile.color || randomColor(chat),
        },
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
    .on('UPDATE', async (payload) => {
      const { errors, new: updatedChat } = payload;
      if (errors) {
        console.error(errors);
      }
      await handleUpdateChat(updatedChat);
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

const handleUpdateChat = async ({ likes, id }) => {
  const indexOfChat = chats.value.findIndex((chat) => chat.id === id);
  const chatToUpdate = chats.value[indexOfChat];
  if (indexOfChat === -1) {
    return;
  }
  chats.value.splice(indexOfChat, 1, {
    ...chatToUpdate,
    likes,
  });
};
</script>
<template>
  <chat-container :chats="chats" />
</template>
