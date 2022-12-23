<script setup lang="ts">
const footerSiteLinks2: { address: string; text: string }[] = [
  { address: '/contact', text: 'CONTACT US' },
  { address: '/cancellations', text: 'CANCELLATIONS' },
  { address: '/followus', text: 'FOLLOW US' },
  { address: '/privacypolicy', text: 'PRIVACY POLICY' },
];

const footer = ref<HTMLDivElement | null>(null);
</script>
<template>
  <div
    ref="footer"
    class="w-full min-h-screen bg-cyan-700 text-white z-30 mt-auto"
  >
    <h2 class="font-presentational text-4xl pt-20 text-center">
      Imaginary Bungalows
    </h2>
    <div class="flex flex-row justify-evenly space-x-10 pt-10">
      <div class="h-96 flex flex-col space-y-2 items-center w-2/6">
        <h2 class="text-2xl">Newsletter</h2>
        <input
          type="email"
          class="border-b-2 border-white bg-cyan-700 text-white text-center appearance-none focus:outline-none focus:placeholder-transparent w-full"
          placeholder="Email"
        />
        <button class="hover:border-b-2 border-white text-xl">Subscribe</button>
      </div>
      <div class="w-2/6">
        <NuxtLink
          v-for="(link, index) in footerSiteLinks2"
          :to="link.address"
          :key="link.text"
          class="hover:underline flex flex-col w-auto text-xl"
          >{{ link.text }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
