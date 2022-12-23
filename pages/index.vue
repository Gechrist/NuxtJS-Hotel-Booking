<template>
  <div class="min-h-screen">
    <section
      class="h-screen w-full bg-[url('../assets/images/welcome.webp')] bg-cover bg-center bg-fixed"
    >
      <h1
        class="text-[24px] md:text-[52px] 3xl:text-[72px] pt-[153px] md:pt-[233px] 3xl:pt-[333px] text-center font-presentational"
      >
        Welcome to Imaginary Bungalows
      </h1>
    </section>
    <main>
      <div
        class="min-h-screen border-b-2 border-black w-full font-presentational space-x-0 flex flex-row items-center justify-between 3xl:justify-around"
      >
        <section class="px-2 text-3xl lg:text-5xl text-center lg:pl-2">
          An once in a lifetime experience
        </section>
        <section ref="expImgs" class="">
          <img
            ref="expImgOne"
            src="../assets/images/sunset&bungalow.webp"
            alt="imaginary bungalows sunset"
            class="w-5/6 3xl:w-full rounded"
          />
          <img
            ref="expImgTwo"
            src="../assets/images/jetski.webp"
            alt="imaginary bungalows sunset"
            class="w-2/6 3xl:w-3/6 rounded absolute -bottom-8 md:bottom-20 md:-left-10 -left-8 3xl:-left-12 -rotate-[10deg]"
          />
          <img
            ref="expImgThree"
            src="../assets/images/food.webp"
            alt="imaginary bungalows sunset"
            class="w-2/6 3xl:w-3/6 rounded absolute right-6 3xl:right-0 bottom-4 rotate-[10deg]"
          />
        </section>
      </div>
      <div
        class="min-h-screen w-full font-presentational space-x-0 flex flex-row items-center justify-between 3xl:justify-around"
      >
        <section ref="locImgs">
          <img
            ref="locImgOne"
            src="../assets/images/palmtrees&beach.webp"
            alt="imaginary bungalows beach with palmtrees"
            class="w-5/6 3xl:w-full rounded -rotate-2 relative left-4"
          />
          <img
            ref="locImgTwo"
            src="../assets/images/cliffs&beach.webp"
            alt="imaginary bungalows cliffs beach"
            class="w-5/6 3xl:w-full rounded absolute -bottom-28 md:bottom-10 right-4 md:-right-0 lg:-right-32 -rotate-[5deg]"
          />
        </section>
        <section
          class="text-3xl lg:text-5xl text-center w-3/6 h-auto py-24 border-l-2 border-black"
        >
          A dream retreat uniquely situated
        </section>
      </div>
      <div class="h-full md:min-h-screen w-full font-presentational">
        <section ref="relaxText">
          <h2 class="text-3xl lg:text-5xl text-center w-full h-auto pt-32">
            Blue waters, sandy beaches and all the sun you need
          </h2>
          <p class="text-2xl lg:text-4xl text-center w-full h-auto py-12">
            The perfect place to find yourself
          </p>
        </section>
        <section class="relative">
          <photoSlider />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);
const expImgs = ref<HTMLDivElement | null>(null);
const expImgOne = ref<HTMLDivElement | null>(null);
const expImgTwo = ref<HTMLDivElement | null>(null);
const expImgThree = ref<HTMLDivElement | null>(null);
const locImgs = ref<HTMLDivElement | null>(null);
const locImgOne = ref<HTMLDivElement | null>(null);
const locImgTwo = ref<HTMLDivElement | null>(null);
const relaxText = ref<HTMLDivElement | null>(null);

onMounted(() => {
  gsap.from(expImgs?.value, {
    scrollTrigger: { trigger: expImgs?.value, scrub: 1 },
    y: 100,
    duration: 1,
  });
  gsap.from(expImgOne?.value, {
    scrollTrigger: { trigger: expImgs?.value, scrub: 1 },
    rotation: 15,
    duration: 0.3,
  });
  gsap.from(expImgTwo?.value, {
    scrollTrigger: { trigger: expImgs?.value, scrub: 1 },
    rotation: 25,
    duration: 0.3,
  });
  gsap.from(expImgThree?.value, {
    scrollTrigger: { trigger: expImgs?.value, scrub: 1 },
    rotation: -25,
    duration: 0.3,
  });
  gsap.from(locImgs?.value, {
    scrollTrigger: { trigger: locImgs?.value, scrub: 1 },
    y: 100,
    duration: 1,
  });
  gsap.from(locImgOne?.value, {
    scrollTrigger: { trigger: locImgs?.value, scrub: 1 },
    rotation: 15,
    duration: 0.3,
  });
  gsap.from(locImgTwo?.value, {
    scrollTrigger: { trigger: locImgs?.value, scrub: 1 },
    rotation: -25,
    duration: 0.3,
  });
  gsap.from(relaxText?.value, {
    scrollTrigger: { trigger: relaxText?.value, scrub: 1 },
    y: -25,
    duration: 0.3,
  });
});
</script>
