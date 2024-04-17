<script setup lang="ts">
import { AppTabs, AppTab, ListRepos } from '.';
import { inject } from 'vue';
import { type User } from '@/@types';

const user = inject<User>('user');
</script>

<template>
  <div data-testid="data-repos">
    <AppTabs>
      <AppTab
        title="Repos"
        :quantity="user?.repos.length || 0"
      >
        <ListRepos :repos="user?.repos ?? []" />
      </AppTab>
      <AppTab
        title="Starred"
        :quantity="user?.starred_repos.length || 0"
      >
        <ListRepos
          :repos="user?.starred_repos ?? []"
          is-starred
        />
      </AppTab>
    </AppTabs>
  </div>
</template>

<style module lang="postcss">
.userDetailsRepositories {
  @apply flex;
}
</style>
