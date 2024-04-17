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
  <Transition>
    <div
      class="py-8"
      v-show="isActive"
    >
      <slot />
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
