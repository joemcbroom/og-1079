<script setup>
import ProfileImage from '@/assets/profile-user.png';
import { addOrRemoveLike } from '@/services/supabase';
import { useChatUsersStore } from '@/stores/chatUsers';
import Color from 'color';
import gsap from 'gsap';
import LikeIcon from '@/components/chat/LikeIcon.vue';
import ChatText from '@/components/chat/ChatText.vue';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';

const chatUserStore = useChatUsersStore();
const { chatUser } = chatUserStore;
const props = defineProps({
  chat: {
    type: Object,
    default: null,
  },
  index: {
    type: Number,
    default: null,
  },
  chatIsUser: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const DELAY_MODIFIER = props.chat.isNew ? 0 : props.index * 0.05;

const getAvatar = (chat) => {
  const src = chatUser(chat.profile.id)?.public_avatar_url;
  return src || ProfileImage;
};

const chatUserData = computed(() => chatUser(props.chat.profile.id));

const colorIsDark = (hex) => {
  const color = Color(hex);
  return color.isDark();
};

function onBeforeEnter(el) {
  const text = el.querySelector('.text');
  el.style.opacity = '0';
  text.style.transform = 'scaleX(0)';
}

function onEnter(el, done) {
  const text = el.querySelector('.text');
  gsap.to(text, {
    transform: 'scaleX(1)',
    delay: DELAY_MODIFIER,
    onComplete: done,
  });
  gsap.to(el, {
    opacity: 1,
    delay: DELAY_MODIFIER,
    onComplete: done,
  });
}

const bubble = ref(null);

const handleLike = async (chat) => {
  bubble.value.style.pointerEvents = 'none';
  await addOrRemoveLike(chat);
  bubble.value.style.pointerEvents = 'auto';
};
</script>

<template>
  <transition
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    appear
  >
    <div class="grid grid-cols-5 select-none">
      <div
        class="flex flex-col justify-end items-center col-span-1"
        :class="chatIsUser ? 'order-last' : 'order-first'"
      >
        <img
          class="rounded-full aspect-square object-cover w-8 h-8 border"
          :src="getAvatar(chat)"
        />
        <span>
          {{ chatIsUser ? 'You' : chat.profile.username }}
        </span>
      </div>
      <div
        ref="bubble"
        class="text col-span-4 flex items-center border w-10/12 my-1 text-sm py-1 rounded-lg"
        :class="
          chatIsUser
            ? 'origin-right ml-auto rounded-br-none justify-end pr-2 text-right'
            : 'origin-left mr-auto rounded-bl-none justify-start pl-2 text-left'
        "
        :style="{ backgroundColor: chatUserData.color }"
        @dblclick="handleLike(chat)"
      >
        <span
          class="overflow-hidden text-ellipsis cursor-pointer hover:overflow-visible"
          :class="
            colorIsDark(chatUserData.color) ? 'text-zinc-50' : 'text-zinc-900'
          "
        >
          <chat-text :text="chat.text" :chatIsUser="chatIsUser" />
          <like-icon
            v-if="chat?.likes"
            :total="chat?.likes?.length"
            :position="chatIsUser ? 'bottom-left' : 'bottom-right'"
            @heartClick="addOrRemoveLike(chat)"
          />
        </span>
      </div>
    </div>
  </transition>
</template>
