<script setup lang="ts">
import { ref, computed } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { type bookingDates } from './BookingMenu.vue';

const dates = ref<bookingDates | null>(null);
const err = ref<string | null>(null);
const currentDate = new Date();

const formattedStartDate = computed(() => {
  return dates.value?.start.toString().substring(0, 15);
});
const formattedEndDate = computed(() => {
  return dates.value?.end.toString().substring(0, 15);
});

defineEmits<{ (emitDates: typeof dates): void }>();
</script>
<template>
  <div class="flex flex-col items-center">
    <DatePicker
      isRange
      isExpanded
      :min-date="currentDate.setDate(currentDate.getDate() + 1)"
      :columns="$screens({ default: 1, md: 2 })"
      :rows="$screens({ default: 2, md: 1 })"
      v-model="dates"
      @click="!err ? $emit('emitDates', dates) : null"
    />
    <div class="text-white mt-2 md:mt-10 h-12">
      <div
        v-if="dates"
        class="w-full flex items-center space-x-2 flex-row text-center"
      >
        {{ formattedStartDate }}
        <img
          alt="right arrow imaginary bungalows"
          src="../assets/icons/rightArrow.svg"
          class="w-6"
        />
        {{ formattedEndDate }}
      </div>
    </div>
  </div>
</template>
