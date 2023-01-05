<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type PropType } from 'vue';
import { type bookingDates } from './BookingMenu.vue';

const props = defineProps({
  dates: { type: Object as PropType<bookingDates | undefined>, required: true },
  visitors: Number,
});

type Availrooms = {
  accommodation: number;
  price: number;
  title: string;
  bookedUnits?: number;
  availUnits: [string];
};

const rooms = ref<Availrooms[] | null>(null);
const loading = ref<boolean>(false);
const err = ref<string | null>(null);
let controller: AbortController | null = null;
const availableUnits = ref<Array<any>>([]);
const roomType = ref<string | null>(null);
const bookedUnits = ref<number | undefined>(1);
const rPrice = ref<number | null>(100);
const showBookingForm = ref<boolean | null>(false);

const getRooms = async () => {
  loading.value = true;
  clearNuxtData();
  controller?.abort();
  try {
    controller = new AbortController();
    const {
      data: response,
      pending,
      error,
    } = await useFetch<Availrooms[]>(
      `/api/getRooms?startDate=${props.dates!.start}&endDate=${
        props.dates!.end
      }`,
      { signal: controller.signal }
    );
    if (response?.value?.length === 0) {
      loading.value = false;
      return (err.value = 'No vacancy for the selected dates');
    }
    if (error.value) {
      console.log(error.value);
      return (err.value =
        'Something went wrong. If the error persists, please contact the administrator');
    }
    loading.value = pending.value;
    response.value!.map((room) => {
      room.bookedUnits = 1;
    });
    rooms.value = response.value;
  } catch (e: any) {
    err.value =
      'Something went wrong. If the error persists, please contact the administrator';
    console.log(e.message);
  }
};

onMounted(() => {
  getRooms();
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen"
    v-if="loading"
  >
    <img src=../assets/icons/threeDots.svg alt="loading icon" class='w-28' />
  </div>
  <bookingForm
    v-if="showBookingForm"
    :dates="props.dates"
    :visitors="props.visitors"
    :rType="(roomType as string)"
    :bookedUnits="bookedUnits"
    :rPrice="(rPrice as number)"
    :availableUnits="availableUnits"
  />
  <div
    class="flex flex-col items-center justify-center h-5/6 text-white"
    v-if="err"
  >
    <p class="text-center md:text-xl">
      {{ err }}
    </p>
  </div>
  <div
    class="flex items-start justify-center text-sm md:text-base h-auto text-white"
    v-else="rooms"
  >
    <table
      class="border-b-[1px] border-gray-200 h-4/6 md:w-5/6 w-full mt-8 mx-1 divide-y-[1px] divide-gray-200"
    >
      <tbody v-for="room in rooms" :key="room.title">
        <tr>
          <td colspan="4" class="text-xl text-center">
            Available Units: {{ room.availUnits.length }}
          </td>
        </tr>
        <tr>
          <td>
            <img
              class="w-24"
              :src="`${
                room.title.includes('Double')
                  ? '/_nuxt/assets/images/room.webp'
                  : room.title.includes('Luxury')
                  ? '/_nuxt/assets/images/room.webp'
                  : room.title.includes('Family')
                  ? '/_nuxt/assets/images/room.webp'
                  : room.title.includes('Triple')
                  ? '/_nuxt/assets/images/room.webp'
                  : null
              }`"
            />
          </td>
          <td>
            <NuxtLink to="/accommodation" class="hover:underline">{{
              room.title
            }}</NuxtLink>
            ({{ room.accommodation }}
            Guests)
          </td>
          <td>
            <div
              class="flex flex-row text-black items-center justify-center space-x-2"
            >
              <p
                class="w-8 leading-6 h-8 text-center text-3xl cursor-pointer rounded-full bg-white"
                @click="
                  room.bookedUnits! > 1
                    ? (room.bookedUnits! -= 1)
                    : (room.bookedUnits = 1)
                "
              >
                &lt;
              </p>
              <p :class="`text-white whitespace-nowrap  md:text-xl`">
                {{ room.bookedUnits }} x {{ room.price }}€/Night
              </p>
              <p
                class="w-8 h-8 leading-6 text-center text-3xl cursor-pointer rounded-full bg-white"
                @click="
                  room.bookedUnits! < room.availUnits.length
                    ? (room.bookedUnits! += 1)
                    : (room.bookedUnits = room.availUnits.length)
                "
              >
                >
              </p>
            </div>
          </td>
          <td>
            <button
              class="rounded bg-white text-black px-2 py-1 active:bg-blue-800"
              @click="
                roomType = room.title;
                bookedUnits = room.bookedUnits;
                availableUnits = room.availUnits;
                rPrice = room.price;
                rooms = null;
                showBookingForm = true;
              "
            >
              Book Now
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
