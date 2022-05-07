<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  chatIsUser: {
    type: Boolean,
    default: false,
  },
});

const hasGif = (text) => {
  return text.includes('.gif');
};

const gifs = ref([]);

onMounted(() => {
  if (hasGif(props.text)) {
    const gifHrefs = props.text
      .split(' ')
      .filter((str) => str)
      .map((str) => str.trim());

    gifs.value = gifHrefs;
  }
});

const gifHrefs = computed(() => {
  if (hasGif(props.text)) {
    const hrefs = props.text
      .split(' ')
      .filter((str) => str)
      .map((str) => str.trim());
    return hrefs;
  }
});
</script>

<template>
  <span
    v-if="gifHrefs?.length"
    class="flex"
    :class="chatIsUser ? 'justify-end' : 'justify-start'"
  >
    <img
      v-for="gif in gifHrefs"
      :src="gif"
      :key="gif"
      :alt="gif"
      class="w-10/12 py-1"
    />
  </span>
  <span class="text-ellipsis" v-else>
    {{ text }}
  </span>
</template>
