<script setup lang="ts">
import { SearchIcon } from '@/components';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'update:updateModel']);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <div class="block w-full">
    <label class="relative text-slate-grey">
      <SearchIcon class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" />
      <input
        v-model="inputValue"
        class="placeholder:text-slate-grey block bg-white w-full border border-white-secondary rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm dark:bg-slate-500 dark:border-slate-400"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="$emit('update:updateModel')"
      />
    </label>

    <div class="h-6">
      <span
        v-show="error"
        class="text-orange text-[0.75rem]"
        >{{ errorMessage }}</span
      >
    </div>
  </div>
</template>
