<script setup>
import ProfileImage from '@/assets/profile-user.png';
import { supabase } from '@/services/supabase';
import { useChatUsersStore } from '@/stores/chatUsers';
import Color from 'color';
import gsap from 'gsap';
import { onMounted, ref } from 'vue';

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
});

const DELAY_MODIFIER = props.chat.isNew ? 0 : props.index * 0.05;

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

function onBeforeEnter(el) {
  const elToAnimate = el.querySelector('.text');
  el.style.opacity = '0';
  elToAnimate.style.transform = 'scaleX(0)';
}

function onEnter(el, done) {
  const elToAnimate = el.querySelector('.text');
  gsap.to(elToAnimate, {
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

// function onLeave(el, done) {
//   gsap.to(el, {
//     transform: 'scaleX(0)',
//     delay: DELAY_MODIFIER,
//     onComplete: done,
//   });
// }
</script>

<template>
  <transition
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    appear
  >
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
        class="text origin-right col-span-4 flex justify-start items-center border w-10/12 ml-auto my-1 text-sm pl-4 rounded-lg rounded-br-none"
        :style="{ backgroundColor: randomColor(chat.profile.id).hex }"
      >
        <span
          :class="
            randomColor(chat.profile.id).isDark
              ? 'text-zinc-50'
              : 'text-zinc-900'
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
        class="text origin-left col-span-4 flex justify-start items-center border w-10/12 mr-auto my-1 text-sm pl-4 rounded-lg rounded-bl-none"
        :style="{ backgroundColor: randomColor(chat.profile.id).hex }"
      >
        <span
          :class="
            randomColor(chat.profile.id).isDark
              ? 'text-zinc-50'
              : 'text-zinc-900'
          "
        >
          {{ chat.text }}
        </span>
      </div>
    </div>
  </transition>
</template>
