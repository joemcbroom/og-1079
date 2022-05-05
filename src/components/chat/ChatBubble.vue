<script setup>
import ProfileImage from '@/assets/profile-user.png';
import { supabase } from '@/services/supabase';
import { useChatUsersStore } from '@/stores/chatUsers';
import Color from 'color';

const chatUserStore = useChatUsersStore();
const { chatUser } = chatUserStore;
const props = defineProps({
  chat: {
    type: Object,
    default: null,
  },
});

const chatIsUser = ({ profile: { id } }) => {
  return id === supabase.auth.user().id;
};

const getAvatar = (chat) => {
  const src = chatUser(chat.profile.id)?.public_avatar_url;
  return src || ProfileImage;
};

function hashCode(str) {
  // java String#hashCode
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

const randomColor = (id) => {
  const hex = `#${intToRGB(hashCode(id))}`;
  const color = Color(hex);
  return {
    hex,
    isDark: color.isDark(),
  };
};
</script>

<template>
  <div class="grid grid-cols-5" v-if="chatIsUser(chat)">
    <div
      class="flex flex-col justify-center items-center col-span-1 order-last"
    >
      <img
        class="rounded-full aspect-square object-cover w-8 h-8 border"
        :src="getAvatar(chat)"
      />
      <span>Me</span>
    </div>
    <div
      class="col-span-4 flex justify-start items-center border w-10/12 ml-auto my-1 text-sm pl-4 rounded-lg rounded-br-none"
      :style="{ backgroundColor: randomColor(chat.profile.id).hex }"
    >
      <span
        :class="
          randomColor(chat.profile.id).isDark ? 'text-zinc-50' : 'text-zinc-900'
        "
      >
        {{ chat.text }}
      </span>
    </div>
  </div>

  <div class="grid grid-cols-5" v-else>
    <div class="flex flex-col justify-center items-center col-span-1">
      <img
        class="rounded-full aspect-square object-cover w-8 h-8 border"
        :src="getAvatar(chat)"
      />
      <span class="">{{ chat.profile.username }}</span>
    </div>
    <div
      class="col-span-4 flex justify-start items-center border w-10/12 mr-auto my-1 text-sm pl-4 rounded-lg rounded-bl-none"
      :style="{ backgroundColor: randomColor(chat.profile.id).hex }"
    >
      <span
        :class="
          randomColor(chat.profile.id).isDark ? 'text-zinc-50' : 'text-zinc-900'
        "
      >
        {{ chat.text }}
      </span>
    </div>
  </div>
</template>
