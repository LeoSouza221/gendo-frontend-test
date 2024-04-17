<script setup lang="ts">
import { ref, onMounted, reactive, provide } from 'vue';
import { UserDetailsSide, UserDetailsRepositories, AppSpin, ErrorMessage } from '@/components';
import { type User } from '@/@types';
import http from '@/lib/http';

const loading = ref(true);
const errorMessage = ref<string | undefined>(undefined);
const userName = ref('LeoSouza221');
const user = reactive<User>({
  id: 0,
  name: '',
  bio: '',
  avatar_url: '',
  repos: [],
  starred_repos: [],
});
provide('user', user);

onMounted(() => {
  getUserDetails();
});

const getUserDetails = () => {
  loading.value = true;

  Promise.all([getUser(), getRepositories(), getStarredRepositories()])
    .then((result) => {
      const [userResult, repositoriesResult, starredRepositories] = result;

      user.name = userResult.name;
      user.bio = userResult.bio;
      user.avatar_url = userResult.avatar_url;
      user.repos = repositoriesResult;
      user.starred_repos = starredRepositories;
    })
    .catch((e) => {
      console.log(e);
      if (e?.response?.status === 404) {
        errorMessage.value = e?.response?.data.message;
        return;
      }

      errorMessage.value = 'Unnexpected Error';
    })
    .finally(() => {
      loading.value = false;
    });
};

const getUser = async () => {
  const response = await http.get(`api/users/${userName.value}`);

  return response.data;
};

const getRepositories = async () => {
  const response = await http.get('api/users/LeoSouza221/repos');

  return response.data;
};

const getStarredRepositories = async () => {
  const response = await http.get('api/users/LeoSouza221/starred');

  return response.data;
};
</script>

<template>
  <div v-if="!loading">
    <div
      v-if="!errorMessage"
      class="grid grid-rows-[max-content_1fr] lg:grid-rows-1 lg:grid-cols-4 gap-4"
    >
      <div>
        <UserDetailsSide />
      </div>
      <div class="col-span-3">
        <UserDetailsRepositories />
      </div>
    </div>
    <div v-else>
      <ErrorMessage>
        <span>{{ errorMessage }}</span>
      </ErrorMessage>
      <div>
        <button
          class="bg-blue hover:bg-blue-700 text-white py-2 px-3 rounded"
          @click="getUserDetails"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <AppSpin />
  </div>
</template>
