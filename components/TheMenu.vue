<script setup lang="ts">
import { ref, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({ setShowMenu: Boolean });
const emit = defineEmits<{
  (listenForRouteChange: string): void;
}>();

const headerSiteLinks: Array<{ text: string; address: string }> = [
  { text: 'HOME', address: '/' },
  { text: 'ABOUT', address: '/about' },
  { text: 'ACCOMMODATION', address: '/accommodation' },
  { text: 'FEATURES', address: '/features' },
  { text: 'LOCATION', address: '/location' },
  { text: 'SERVICES', address: '/services' },
];
const menu = ref<HTMLDivElement | null>(null);

watch(
  () => props.setShowMenu,
  () => {
    if (process.client && props.setShowMenu) {
      gsap.from(menu?.value, { duration: 1, ease: 'power2.out', x: -300 });
    }
  }
);
</script>
<template>
  <aside
    ref="menu"
    class="fixed w-full min-h-screen top-0 z-40 md:w-1/2 bg-cyan-700 text-white"
  >
    <div
      class="flex flex-col -space-y-6 items-center min-h-screen mt-40 text-xl"
    >
      <NuxtLink
        v-for="link in headerSiteLinks"
        :key="link.text"
        :to="link.address"
        :prefetch="link.text == 'HOME' ? false : true"
        @click="emit('listenForRouteChange')"
        ><p class="link_ltr after:border-white">
          {{ link.text }}
        </p></NuxtLink
      >
    </div>
  </aside>
</template>
