<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const black = ref<HTMLDivElement | null>(null);
const counter = ref<number>(0);

const slideFunction = (arg: string) => {
  const sliderTimeline = gsap.timeline();

  if (arg == '+') {
    if (counter.value === 3) {
      null;
    } else {
      counter.value += 1;
      sliderTimeline.from(black.value, {
        display: 'block',
        x: '-100%',
        ease: 'sine.inOut',
        duration: 1.2,
      });
      sliderTimeline.to(
        `.bg_${counter.value - 1}`,
        {
          display: 'none',
          duration: 1,
          ease: 'sine.inOut',
        },
        '<0.2'
      );
    }
  }
  if (arg == '-') {
    if (counter.value === 0) {
      null;
    } else {
      counter.value -= 1;

      sliderTimeline.from(black.value, {
        display: 'block',
        x: '-100%',
        ease: 'sine.inOut',
        duration: 1.2,
      });
      sliderTimeline.to(
        `.bg_${counter.value}`,
        {
          display: 'block',
          duration: 1,
          ease: 'sine.inOut',
        },
        '>'
      );
    }
  }
};
</script>
<template>
  <div class="grid grid-cols-1 w-full pb-[30px]">
    <div class="grid w-full z-40 hidden row-start-1 col-start-1" ref="black">
      <div class="relative bg-black h-[100%]"></div>
    </div>
    <div class="bg_0 z-10 w-full grid row-start-1 col-start-1">
      <div class="relative">
        <img
          src="/images/hand_touching_water.webp"
          alt="imaginary bungalows hand in water"
        />
      </div>
    </div>
    <div class="bg_1 z-0 w-full grid row-start-1 col-start-1">
      <div class="relative">
        <img
          src="/images/meditation.webp"
          alt="imaginary bungalows meditation"
        />
      </div>
    </div>
    <div class="bg_2 -z-10 w-full grid row-start-1 col-start-1">
      <div class="relative">
        <img
          src="/images/woman_in_water.webp"
          alt="imaginary bungalows woman in water"
        />
      </div>
    </div>
    <div class="bg_3 -z-20 w-full grid row-start-1 col-start-1">
      <div class="relative">
        <img
          src="/images/man_relaxing_water.webp"
          alt="imaginary bungalows man relaxing water"
        />
      </div>
    </div>

    <div
      class="absolute z-20 rounded-full bg-black/70 flex flex-col top-1/4 right-4 space-y-4"
    >
      <img
        src="../assets/icons/sliderUpArrow.svg"
        class="w-8 cursor-pointer"
        :class="{ 'opacity-50 cursor-auto': counter === 3 }"
        @click="slideFunction('+')"
      />
      <p class="text-white text-center font-functional">{{ counter + 1 }}</p>
      <img
        src="../assets/icons/sliderDownArrow.svg"
        class="w-8 cursor-pointer"
        :class="{ 'opacity-50 cursor-auto': counter === 0 }"
        @click="slideFunction('-')"
      />
    </div>
  </div>
</template>
