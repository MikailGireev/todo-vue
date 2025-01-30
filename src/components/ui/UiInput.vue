<script setup lang="ts">
const { type, placeholder } = defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :class="[
      'p-3 w-[95%] border-gray-300 border-solid focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-md',
      $attrs.class,
    ]"
    v-bind="$attrs"
    :type="type"
    :placeholder="placeholder"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
