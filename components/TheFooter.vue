<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import useIntersection from '~~/composables/useIntersectionObserver';

const emit = defineEmits<{
  (listenForWhiteMenu: string): void;
  (listenForBlackMenu: string): void;
}>();

const footer = ref<HTMLDivElement | null>();
const footerSiteLinks2: { address: string; text: string }[] = [
  { address: '/contact', text: 'CONTACT US' },
  { address: '/cancellations', text: 'CANCELLATIONS' },
  { address: '/followus', text: 'FOLLOW US' },
  { address: '/privacypolicy', text: 'PRIVACY POLICY' },
];

let observerInstance: IntersectionObserver;
let observerInstanceElement = ref<Element | null | undefined>();

onMounted(() => {
  const { observedElement, isVisible, interCallback, observer } =
    useIntersection();
  observerInstance = observer;
  observerInstanceElement = observedElement;
  observerInstanceElement!.value = footer.value;
  interCallback;
  observerInstance.observe(
    observerInstanceElement!.value as unknown as Element
  );
  watch(isVisible, () =>
    isVisible.value ? emit('listenForWhiteMenu') : emit('listenForBlackMenu')
  );
});
onUnmounted(() => {
  observerInstance.unobserve(observerInstanceElement!.value as Element);
});
</script>
<template>
  <div
    ref="footer"
    class="w-full min-h-screen bg-cyan-700 text-white z-30 mt-auto"
  >
    <h2 class="font-presentational text-4xl pt-20 text-center">
      Imaginary Bungalows
    </h2>
    <div class="flex flex-col space-y-4 items-center">
      <div class="flex flex-col space-y-4 items-center w-2/6 mt-10">
        <h2 class="text-2xl">Newsletter</h2>
        <input
          type="email"
          class="border-b-2 border-white bg-cyan-700 text-white text-center appearance-none focus:outline-none focus:placeholder-transparent w-full"
          placeholder="Your Email"
        />
        <button class="link_ltr text-xl">Subscribe</button>
      </div>
      <div class="flex flex-row space-x-4 md:space-x-10 justify-center">
        <NuxtLink
          v-for="link in footerSiteLinks2"
          :to="link.address"
          :key="link.text"
          class="text-sm md:text-xl"
          ><p class="link_ltr">{{ link.text }}</p></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
