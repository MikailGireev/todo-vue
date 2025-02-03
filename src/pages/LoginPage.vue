<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue';
import UiForm from '@/components/ui/UiForm.vue';
import UiInput from '@/components/ui/UiInput.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const form = ref({
  username: '',
  password: '',
});

const onSubmit = async () => {
  await store.login(form.value.username, form.value.password);

  if (store.user) {
    router.push('/');
  }
};
</script>

<template>
  <div>
    <UiForm title="Login">
      <UiInput v-model="form.username" type="text" placeholder="Username" />
      <UiInput v-model="form.password" type="password" placeholder="Password" />
      <UiButton @click="onSubmit" type="submit" text="Log in" />
    </UiForm>
  </div>
</template>
