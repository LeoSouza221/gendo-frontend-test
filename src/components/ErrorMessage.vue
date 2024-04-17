<script setup lang="ts">
import { GithubIcon } from '@/components';
</script>
<template>
  <div class="p-8 flex flex-col items-center justify-center text-5xl text-slate-grey">
    <GithubIcon />
    <slot />
  </div>
</template>
