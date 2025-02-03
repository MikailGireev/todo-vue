import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/utils/types';
import { useLogin, useRegister, useUser } from './userService';
import { useQueryClient } from '@tanstack/vue-query';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const queryClient = useQueryClient();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loadUser = () => {
    if (!user.value?.token) return;

    const { data } = useUser(user.value.token);

    watchEffect(() => {
      if (data.value) {
        user.value = data.value;
      }
    });
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({ username, password });
      if (response) {
        user.value = response;
        queryClient.invalidateQueries({ queryKey: ['user'] });
        localStorage.setItem('user', JSON.stringify(response));
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await registerMutation.mutateAsync({ username, password });
      if (response) {
        user.value = response;
        queryClient.invalidateQueries({ queryKey: ['user'] });
        await login(username, password);
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  return { user, login, register, loadUser, logout };
});
