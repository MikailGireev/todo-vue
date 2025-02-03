<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue';
import UiForm from '@/components/ui/UiForm.vue';
import UiInput from '@/components/ui/UiInput.vue';
import { useUserStore } from '@/stores/user';
import type { Form } from '@/utils/types';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const form = reactive<Form>({
  username: '',
  password: '',
});

const onSubmit = async () => {
  await store.login(form.username, form.password);

  if (store.user) {
    router.push('/');
  }
};
</script>

<template>
  <div>
    <UiForm @submit="onSubmit" title="Login">
      <UiInput v-model="form.username" type="text" placeholder="Username" />
      <UiInput v-model="form.password" type="password" placeholder="Password" />
      <UiButton type="submit"> Log in</UiButton>
    </UiForm>
  </div>
</template>
