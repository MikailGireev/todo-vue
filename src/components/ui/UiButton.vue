<script setup lang="ts">
const { text, type } = defineProps({
  text: { type: String, default: 'CLick' },
  type: { type: String as () => 'button' | 'submit' | 'reset', default: 'button' },
});
</script>

<template>
  <button
    :type="type"
    :class="[
      'p-3  bg-red-600 text-white border-opacity-30 border-solid cursor-pointer rounded-2xl hover:shadow-lg focus:outline-none',
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    {{ text }}
  </button>
</template>
