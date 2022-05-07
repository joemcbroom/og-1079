<script setup>
import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';
import { computed, ref } from 'vue';
import Color from 'color';

const props = defineProps({
  userColor: {
    type: String,
    default: '#fff',
  },
});

defineEmits(['updateColor']);

const color = ref(props.userColor);

const changeColor = (value) => {
  color.value = value.hex;
};

const colorIsDark = computed(() => Color(color.value).isDark());
</script>

<template>
  <div class="bg-[#f7f8f9] w-9/12 mx-auto border">
    <div :style="{ background: color }" class="mx-auto w-min rounded-lg">
      <ColorPicker
        theme="light"
        :color="color"
        :sucker-hide="true"
        @changeColor="changeColor"
      />
    </div>
    <button
      @click="$emit('updateColor', color)"
      :style="{ background: color, color: colorIsDark ? '#fff' : '#000' }"
      class="px-2 py-1 mt-2 mb-3 rounded"
    >
      Select Color
    </button>
  </div>
</template>

<style>
.colors .item:nth-child(8n + 1) {
  margin-left: 10px;
}
.hu-color-picker {
  box-shadow: none;
}
.color-type,
.color-alpha {
  display: none;
}

.color-show {
  border: 1px solid black;
  overflow: hidden;
  border-radius: 4px;
}
</style>
