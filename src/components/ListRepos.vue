<script setup lang="ts">
import { type Repositories } from '@/@types';

defineProps<{
  repos: Repositories[];
}>();
</script>

<template>
  <ul
    v-if="repos.length"
    data-testid="repos-list"
  >
    <li
      v-for="repo in repos"
      v-key="repo.id"
    >
      <div>
        <span>{{ repo.full_name }}</span>
        <p>{{ repo.description }}</p>
        <div>
          <div>
            <span>{{ repo.stargazers_count }}</span>
          </div>
          <div>
            <span>{{ repo.forks }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style module lang="postcss">
.listRepos {
  @apply flex;
}
</style>
