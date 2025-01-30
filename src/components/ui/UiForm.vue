<script setup lang="ts">
const { title } = defineProps({
  title: { type: String, default: 'Form' },
});

const emit = defineEmits(['submit']);
</script>

<template>
  <form
    @submit.prevent="emit('submit')"
    :class="[
      'p-4 border-solid border-2 border-gray-300 border-opacity-25 rounded-2xl form__shadow flex flex-col gap-5',
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    <h1 class="text-4xl font-light text-slay-600">{{ title }}</h1>
    <slot></slot>
  </form>
</template>

<style scoped>
.form__shadow {
  box-shadow: 0px 1px 20px rgb(240 240 240 / 80%);
}
</style>
