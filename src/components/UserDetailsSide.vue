<script setup lang="ts">
import { inject } from 'vue';
import { UserIcon } from '@/components';
import { type User } from '@/@types';

const user = inject<User>('user');
</script>

<template>
  <div class="w-full px-4 flex items-center gap-4 lg:block">
    <div class="py-3 lg:flex lg:justify-center min-w-24">
      <img
        v-if="user?.avatar_url"
        class="rounded-full w-20 h-20 lg:w-44 lg:h-44"
        alt="profile_image"
        :src="user.avatar_url"
      />
      <div
        v-if="!user?.avatar_url"
        class="border-2 border-slate-grey rounded-full w-44 h-44 text-slate-grey"
        data-testid="user-icon"
      >
        <UserIcon class="h-[100px] w-[100px]" />
      </div>
    </div>
    <div class="lg:text-center">
      <span class="text-xl font-bold">{{ user?.name ?? '' }}</span>
      <p class="text-sm text-slate-grey">{{ user?.bio ?? '' }}</p>
    </div>
  </div>
</template>
