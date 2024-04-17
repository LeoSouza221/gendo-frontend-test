<script setup lang="ts">
import { onMounted } from 'vue';
import { AppHeader } from '@/components';
import Home from '@/pages/home/Home.vue';
</script>

<template>
  <AppHeader></AppHeader>

  <main class="container mx-auto mt-4">
    <Home />
  </main>
</template>
