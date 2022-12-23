<script setup lang="ts">
const props = defineProps({
  startDate: String,
  endDate: String,
  price: Number,
  rType: String,
});

const bookingDetails = reactive<
  Array<{ label: string; value: string | number }>
>([
  { label: 'Check-In: ', value: props.startDate },
  { label: 'Check-Out:', value: props.endDate },
  { label: 'Booking Total:', value: props.price + `€` },
]);
</script>

<template>
  <div class="w-full md:w-4/6 text-white mx-auto h-auto text-sm md:text-base">
    <h2 class="text-2xl mt-8 mb-2 text-center">Booking Confirmed</h2>
    <div class="flex flex-col space-y-2">
      <p class="text-center w-full">
        We are pleased to announce you that your reservation request has been
        received and confirmed.
      </p>
      <p class="text-center">Your booking is confirmed. Thank you!</p>
      <div class="mt-14 ml-1 flex flex-col space-y-4">
        <h3 class="text-left font-bold">Booking Details</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th v-for="det in bookingDetails" class="text-left">
                <p>{{ det.label }}</p>
              </th>
              <th>
                <p class="text-left">Status:</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="det in bookingDetails">
                <p>{{ det.value }}</p>
              </td>
              <td>
                <p>Confirmed</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-left font-semibold ml-1">{{ props.rType }}</p>
    </div>
  </div>
</template>
