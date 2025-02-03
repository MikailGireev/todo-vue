<script setup lang="ts">
const props = defineProps<{ type?: 'button' | 'submit' | 'reset' }>();
</script>

<template>
  <button
    :type="props.type ?? 'button'"
    :class="[
      'p-3  bg-red-600 text-white border-opacity-30 border-solid cursor-pointer rounded-2xl hover:shadow-lg focus:outline-none',
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
