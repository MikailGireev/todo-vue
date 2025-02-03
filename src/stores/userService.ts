import type { User } from '@/utils/types';
import { useQuery, useMutation } from '@tanstack/vue-query';

export const useUser = (token: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return (await response.json()) as User;
    },
    enabled: !!token,
  });
};

export const useLogin = () => {
  return useMutation<User, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as unknown as User;
    },
  });
};

export const useRegister = () => {
  return useMutation<User, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as unknown as User;
    },
  });
};
