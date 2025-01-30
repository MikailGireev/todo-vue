<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue';
import UiForm from '@/components/ui/UiForm.vue';
import UiInput from '@/components/ui/UiInput.vue';
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
});

const onSubmit = () => {
  console.log(form.value);
  form.value = {
    email: '',
    password: '',
  };
};
</script>

<template>
  <div>
    <UiForm @submit="onSubmit" title="Register">
      <UiInput v-model="form.email" type="email" placeholder="Email" />
      <UiInput v-model="form.password" type="password" placeholder="Password" />
      <UiButton type="submit" text="Sing in" />
    </UiForm>
  </div>
</template>
