<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserDetailsSide } from '@/components';
import http from '@/lib/http';

onMounted(async () => {
  const user = await http.get('api/users/LeoSouza221');
  const repos = await http.get('api/users/LeoSouza221/repos');
  const starred = await http.get('api/users/LeoSouza221/starred');

  console.log(repos, user, starred);
});

const user = ref({ image: '', name: '' });
</script>

<template>
  <div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-4">
    <div>
      <UserDetailsSide :user="user" />
    </div>
    <div class="col-start-2">teste</div>
  </div>
</template>
