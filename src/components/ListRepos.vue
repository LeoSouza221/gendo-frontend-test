<script setup lang="ts">
import { ref, computed } from 'vue';
import { StarIcon, ForkIcon, CodeIcon, AppInput } from '@/components';
import { type Repositories } from '@/@types';

const { isStarred, repos } = defineProps<{
  isStarred?: boolean;
  repos: Repositories[];
}>();
const search = ref('');

const repoName = (name: string) => {
  return isStarred ? name : name.split('/')[1];
};

const filteredRepos = computed(() => {
  return repos.filter((repo) =>
    JSON.stringify(repo.full_name).toString().toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="px-6 lg:px-0 max-w-[400px]">
    <AppInput
      v-model="search"
      placeholder="Filter by name"
    />
  </div>
  <TransitionGroup
    v-if="filteredRepos.length"
    name="list"
    tag="ul"
    data-testid="repos-list"
  >
    <li
      v-for="(repo, index) in filteredRepos"
      v-key="repo.id ?? index"
      class="py-5 border-b border-white-secondary"
    >
      <div class="px-6 lg:px-0">
        <div class="pb-2">
          <span class="text-blue font-bold">{{ repoName(repo.full_name) }}</span>
        </div>
        <div class="pb-4">
          <p class="text-sm text-slate-grey">{{ repo.description }}</p>
        </div>
        <div class="flex text-slate-grey">
          <div
            v-if="isStarred"
            class="flex"
          >
            <StarIcon />
            <span class="ml-2 text-xs">{{ repo.stargazers_count }}</span>
          </div>
          <div
            v-else="!isStarred"
            class="flex"
          >
            <CodeIcon />
            <span class="ml-2 text-xs">{{ repo.language }}</span>
          </div>
          <span class="m-2"></span>
          <div class="flex">
            <ForkIcon />
            <span class="ml-2 text-xs">{{ repo.forks }}</span>
          </div>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<style module lang="postcss">
.listRepos {
  @apply flex;
}
</style>
