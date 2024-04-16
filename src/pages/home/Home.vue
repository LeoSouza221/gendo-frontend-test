<script setup lang="ts">
import { ref, onMounted, reactive, provide } from 'vue';
import { UserDetailsSide, UserDetailsRepositories, AppSpin } from '@/components';
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

  Promise.all([getUser(), getRepositories()])
    .then((result) => {
      const [userResult, repositoriesResult] = result;

      console.log(userResult, repositoriesResult);

      user.name = userResult.name;
      user.bio = userResult.bio;
      user.avatar_url = userResult.avatar_url;
      user.repos = repositoriesResult;
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

// const getStarredRepositories = async () => {
//   const starred = await http.get('api/users/LeoSouza221/starred');

// }
</script>

<template>
  <div v-if="!loading">
    <div
      v-if="!errorMessage"
      class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-4"
    >
      <div>
        <UserDetailsSide />
      </div>
      <div class="col-span-3">
        <UserDetailsRepositories />
      </div>
    </div>
    <div v-else>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
  <div v-else>
    <AppSpin />
  </div>
</template>
