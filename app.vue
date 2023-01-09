<script setup lang="ts">
import { onMounted } from 'vue';

const setViewHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
onMounted(() => {
  setViewHeight();

  if (process.client) {
    window.addEventListener('resize', () => {
      setViewHeight();
    });
  }
});
</script>
<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
