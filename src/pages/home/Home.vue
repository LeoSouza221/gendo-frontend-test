<script setup lang="ts">
import { ref, onMounted, reactive, provide } from 'vue';
import {
  UserDetailsSide,
  UserDetailsRepositories,
  AppSpin,
  ErrorMessage,
  AppInput,
} from '@/components';
import { type User } from '@/@types';
import http from '@/lib/http';

const loading = ref(true);
const errorMessage = ref<string | undefined>(undefined);
const errorInputMessage = ref<string | undefined>(undefined);
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
  errorMessage.value = undefined;
  errorInputMessage.value = undefined;

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
  const response = await http.get(`api/users/${userName.value}/repos`);

  return response.data;
};

const getStarredRepositories = async () => {
  const response = await http.get(`api/users/${userName.value}/starred`);

  return response.data;
};

const validateNewSearch = () => {
  if (!userName.value.length) {
    errorInputMessage.value = 'Enter a username';

    return;
  }

  getUserDetails();
};
</script>

<template>
  <div v-if="!loading">
    <div class="w-full flex justify-center">
      <div class="px-6 lg:px-0 w-[500px] flex gap-2">
        <AppInput
          v-model="userName"
          placeholder="Username"
          :errorMessage="errorInputMessage"
          :error="!!errorInputMessage"
          @update:update-model="validateNewSearch()"
        />
        <div>
          <button
            class="bg-blue hover:bg-blue-700 text-white py-2 px-3 rounded"
            @click="validateNewSearch()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="!errorMessage"
      class="grid grid-rows-[max-content_1fr] grid-cols-1 gap-y-4 lg:grid-rows-1 lg:grid-cols-4 lg:gap-4"
    >
      <UserDetailsSide />
      <div class="col-span-3">
        <UserDetailsRepositories />
      </div>
    </div>
    <div
      class="flex flex-col items-center"
      v-else
    >
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
  <div
    v-else
    class="pt-8 flex items-center justify-center"
  >
    <AppSpin />
  </div>
</template>
