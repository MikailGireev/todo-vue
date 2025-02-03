import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Filter } from '@/utils/types';

export const useFilterStore = defineStore('filter', () => {
  const filter = ref<Filter>('all');

  const setFilter = (value: Filter) => {
    filter.value = value;
  };

  return { setFilter, filter };
});
