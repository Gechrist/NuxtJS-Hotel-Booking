<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { gsap } from 'gsap';

export type bookingDates = { start: Date; end: Date };

const guestsNumber = ref<number>(0);
const animateSearchIcon = ref<boolean>(false);
const searchIcon = ref<HTMLDivElement | null>(null);
const onListener = ref<HTMLDivElement | null>(null);
const offListener = ref<HTMLDivElement | null>(null);
const bookingMenu = ref<HTMLDivElement | null>(null);
const bookingDates = ref<bookingDates>();
const showCalendar = ref<boolean>(false);
const showRooms = ref<boolean>(false);
const missingData = ref<boolean>(false);
const trackData = ref<boolean>(false);

const on = () => {
  animateSearchIcon.value = true;
};
const off = () => {
  animateSearchIcon.value = false;
};

const displayCalendar = () => {
  showRooms.value = false;
  showCalendar.value = !showCalendar.value;
};

const bookRooms = () => {
  trackData.value = true;
  if (!bookingDates.value || !guestsNumber.value) {
    missingData.value = true;
    return true;
  }
  trackData.value = false;
  missingData.value = false;
  showCalendar.value = false;
  showRooms.value = true;
};

watchEffect(() => {
  if (trackData.value && (!guestsNumber.value || !bookingDates.value)) {
    missingData.value = true;
  } else {
    missingData.value = false;
  }
});
onMounted(() => {
  if (process.client) {
    gsap.from(bookingMenu?.value, {
      duration: 0.5,
      ease: 'power3.out',
      x: 800,
      y: -800,
    });
  }
  if (process.client) {
    onListener.value = searchIcon.value;
    searchIcon.value!.addEventListener('mouseover', on);
    offListener.value = searchIcon.value;
    searchIcon.value!.addEventListener('mouseleave', off);
  }
});

onUnmounted(() => {
  onListener.value!.removeEventListener('mouseover', on);
  offListener.value!.removeEventListener('mouseleave', off);
});
</script>
<template>
  <div
    ref="bookingMenu"
    class="w-full min-h-mobileScreen md:min-h-screen z-40 fixed bg-cyan-700"
  >
    <div
      class="h-mobileScreen md:h-screen overflow-y-auto scrollbar-hide flex flex-col"
    >
      <section class="grow">
        <bookingCalendar
          class="mt-0.5 md:mt-28 w-5/6 mx-auto flex justify-center"
          v-if="showCalendar"
          @emit-dates="(emittedDates) => (bookingDates = emittedDates)"
        />
        <bookingRooms
          v-if="showRooms"
          :dates="bookingDates"
          :visitors="guestsNumber"
        />
      </section>
      <section class="text-white text-center pb-10" v-if="missingData">
        <p>Please select dates and/or the number of guests</p>
      </section>
      <div
        class="w-5/6 mx-auto flex flex-row shrink-0 justify-between px-8 mb-2 items-center rounded-full h-12 bg-cyan-500"
      >
        <img
          src="../assets/icons/calendar.svg"
          alt="imaginary hotel pick dates icon"
          class="w-8 p-1 h-8 bg-white rounded-full cursor-pointer"
          @click="displayCalendar"
        />
        <div class="flex flex-row items-center space-x-2 justify-center">
          <img
            src="../assets/icons/persons.svg"
            alt="imaginary hotel persons icon"
            class="w-6 h-6 cursor-pointer"
          />
          <p class="text-white">Guests</p>
          <div class="flex flex-row items-center space-x-2">
            <p
              class="w-8 leading-6 h-8 text-center text-3xl cursor-pointer rounded-full bg-white"
              @click="
                guestsNumber > 0 ? (guestsNumber -= 1) : (guestsNumber = 0)
              "
            >
              -
            </p>
            <p class="text-white text-xl">
              {{ guestsNumber }}
            </p>
            <p
              class="w-8 h-8 leading-6 text-center text-3xl cursor-pointer rounded-full bg-white"
              @click="guestsNumber += 1"
            >
              +
            </p>
          </div>
        </div>
        <div ref="searchIcon" class="cursor-pointer">
          <img
            v-show="!animateSearchIcon"
            src="../assets/icons/search.svg"
            alt="imaginary hotel search icon"
            class="w-8 p-1 h-8 bg-white rounded-full"
          />
          <p
            v-show="animateSearchIcon"
            class="after:bg-white after:w-0 after:px-2 after:py-1.5 after:content-['Search'] after:rounded-full after:-right-0 after:hover:w-14"
            @click="bookRooms()"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>
