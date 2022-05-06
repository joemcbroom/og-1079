<script setup>
import { computed } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'bottom-left',
  },
  total: {
    type: Number,
    default: 1,
  },
});

defineEmits(['heartClick']);

const heartPosition = computed(() => {
  switch (props.position) {
    case 'bottom-left':
      return '-left-1 -bottom-3';
    case 'bottom-right':
      return 'right-0 -bottom-3';
    case 'top-left':
      return '-left-1 -top-2';
    case 'top-right':
      return 'right-0 -top-2';
    default:
      return '-left-1 -bottom-2';
  }
});
</script>
<template>
  <transition
    enter-active-class="duration-300 ease-in-out delay-100"
    enter-from-class="transform scale-0 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="duration-300 ease-in-out"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="transform scale-0 opacity-0"
    appear
  >
    <div
      class="select-none absolute text-[9px] bg-ogGreen bg-opacity-75 rounded-full px-2 text-zinc-50 font-bold grid place-items-center"
      :class="heartPosition"
      @click="$emit('heartClick')"
    >
      <span class="transform -translate-x-[2px]">
        ❤️
        <span class="pl-[2px]" v-show="total && total > 1">
          {{ total }}
        </span>
      </span>
    </div>
  </transition>
</template>
