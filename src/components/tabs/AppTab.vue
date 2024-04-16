<script setup lang="ts">
import { ref, inject, onBeforeMount, watch } from 'vue';

const addTab = inject('addTab');
const activeTabHash = inject('activeTabHash');

const { title, quantity } = defineProps<{
  title: string;
  quantity: number;
}>();

const hash = ref('');
const isActive = ref(false);

onBeforeMount(() => {
  hash.value = `#${title.toLowerCase().replace(/ /g, '-')}`;

  addTab({
    title: title,
    hash: hash.value,
    quantity: quantity,
  });
});

watch(activeTabHash, () => {
  isActive.value = activeTabHash.value === hash.value;
});
</script>

<template>
  <div
    class="p-8"
    v-show="isActive"
  >
    <slot />
  </div>
</template>
