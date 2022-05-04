<template>
  <label class="w-full">
    <span class="text-lg">{{ label }}</span>
    <input
      class="bg-zinc-800 w-full border-0 border-b border-b-ogGreen pt-2"
      :id="id"
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps(['modelValue', 'label', 'id', 'type', 'disabled', 'showBorder']);
defineEmits(['update:modelValue']);
</script>
