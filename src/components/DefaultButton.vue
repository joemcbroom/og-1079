<script setup>
defineProps({
  action: {
    type: Function,
    default: () => {},
  },
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    class="bg-ogGreen px-4 py-2 rounded text-zinc-100 cursor-pointer"
    :class="disabled ? 'opacity-50 pointer-events-none' : ''"
    @click="action"
  >
    <div v-if="text">{{ text }}</div>
    <slot v-else />
  </button>
</template>
