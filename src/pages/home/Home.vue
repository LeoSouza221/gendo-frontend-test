<script setup lang="ts">
import { ref, onMounted, reactive, provide } from 'vue';
import { UserDetailsSide, AppSpin } from '@/components';
import { type User } from '@/@types';
import http from '@/lib/http';

const loading = ref(true);
const errorMessage = ref(undefined);
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

onMounted(async () => {
  getUser();
});

const getUser = async () => {
  loading.value = true;
  errorMessage.value = undefined;
  try {
    const response = await http.get(`api/users/${userName.value}`);

    user.name = response.data.name;
    user.bio = response.data.bio;
    user.avatar_url = response.data.avatar_url;
  } catch (apiError) {
    console.log(apiError);
    if (apiError?.response?.status === 404) {
      errorMessage.value = apiError?.response?.data.message;
    }
  } finally {
    loading.value = false;
  }
};

// const getRepositories = async () => {
//   const repos = await http.get('api/users/LeoSouza221/repos');

// }

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
      <div class="col-start-2">teste</div>
    </div>
    <div v-else>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
  <div v-else>
    <AppSpin />
  </div>
</template>
