<script setup lang="ts">
import { useFilterStore } from '../stores/filter';
import { storeToRefs } from 'pinia';

const filterStore = useFilterStore();
const { filter } = storeToRefs(filterStore);

const { setFilter } = useFilterStore();
</script>

<template>
  <aside class="app-filters">
    <section v-auto-animate class="toggle-group">
      <button
        @click="setFilter('all')"
        class="button"
        :class="{ 'button--primary': filter === 'all' }"
      >
        All
      </button>
      <button
        @click="setFilter('active')"
        class="button"
        :class="{ 'button--primary': filter === 'active' }"
      >
        Active
      </button>
      <button
        @click="setFilter('done')"
        class="button"
        :class="{ 'button--primary': filter === 'done' }"
      >
        Done
      </button>
    </section>
  </aside>
</template>
