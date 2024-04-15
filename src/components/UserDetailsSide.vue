<script setup lang="ts">
import { inject } from 'vue';
import { UserIcon } from '@/components';
import { type User } from '@/@types';

const user = inject<User>('user');
</script>

<template>
  <div class="">
    <div class="rounded-full w-44 h-44">
      <img
        v-if="user?.avatar_url"
        alt="image"
        :src="user.avatar_url"
      />
      <div
        v-if="!user?.avatar_url"
        data-testid="user-icon"
      >
        <UserIcon class="h-[100px] w-[100px]" />
      </div>
    </div>
    <div>
      <span>{{ user?.name ?? '' }}</span>
      <span>{{ user?.bio ?? '' }}</span>
    </div>
  </div>
</template>
