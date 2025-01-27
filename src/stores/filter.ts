import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', () => {
  const filter = ref('all');

  const setFilter = (value: string) => {
    filter.value = value;
  };

  return { setFilter, filter };
});
