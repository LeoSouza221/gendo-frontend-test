<script setup lang="ts">
import { UserIcon } from '@/components';

interface User {
  image: string;
  name: string;
}

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="">
    <div>
      <img
        v-if="user.image"
        alt="image"
        :src="user.image"
      />
      <div
        v-if="!user?.image"
        data-testid="user-icon"
      >
        <UserIcon class="h-[100px] w-[100px]" />
      </div>
    </div>
  </div>
</template>
