<script setup lang="ts">
import { ref, provide, type Ref } from 'vue';
import { type Tab } from '@/@types';

const activeTabHash = ref('');
const tabs = ref<Tab[]>([]);

provide('addTab', (tab: Tab) => {
  const count = tabs.value.push(tab);

  if (count === 1) {
    activeTabHash.value = tab.hash;
  }
});
provide('activeTabHash', activeTabHash);
</script>

<template>
  <div class="">
    <ul class="w-full justify-around lg:justify-start flex border-b border-white-secondary">
      <li
        class="w-36 flex justify-center py-2 cursor-pointer text-slate-grey"
        :class="{
          'bg-yellow-50': tab.hash !== activeTabHash,
          'border-b-4 border-orange font-bold': tab.hash === activeTabHash,
        }"
        v-for="tab in tabs"
        :key="tab.title"
        @click="activeTabHash = tab.hash"
        :data-testid="tab.title"
      >
        {{ tab.title }}
        <div class="ml-2 w-7 h-5 rounded-full bg-white-secondary text-center font-bold text-sm">
          {{ tab.quantity }}
        </div>
      </li>
    </ul>
    <slot />
  </div>
</template>
