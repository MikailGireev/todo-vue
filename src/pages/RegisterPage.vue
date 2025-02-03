<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue';
import UiForm from '@/components/ui/UiForm.vue';
import UiInput from '@/components/ui/UiInput.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useUserStore();

const form = ref({
  username: '',
  password: '',
});

const onSubmit = async () => {
  await store.register(form.value.username, form.value.password);

  if (store.user) {
    router.push('/');
  }

  form.value = {
    username: '',
    password: '',
  };
};
</script>

<template>
  <div>
    <UiForm @submit="onSubmit" title="Register">
      <UiInput v-model="form.username" type="text" placeholder="Usernmae" />
      <UiInput v-model="form.password" type="password" placeholder="Password" />
      <UiButton type="submit" text="Sing in" />
    </UiForm>
  </div>
</template>
