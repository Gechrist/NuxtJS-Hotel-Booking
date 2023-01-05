<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  color: String,
  whiteMenu: Boolean,
});
const emit = defineEmits<{
  (listenForCloseMenu: string): void;
  (listenForCloseBookingMenu: string): void;
}>();

const showBookingMenu = ref<boolean>(false);
</script>

<template>
  <div
    v-if="!showBookingMenu"
    class="w-32 h-32 rounded-full bg-cyan-700/50 fixed z-50 -top-8 -right-4"
  >
    <button
      :class="`${
        props.whiteMenu ? 'text-white' : 'md:text-black md:after:border-black'
      } z-50 fixed right-2 top-5 ${
        props.color == 'black' && !props.whiteMenu
          ? 'md:text-black after:border-black'
          : 'text-white after:border-white'
      }  link_rtl`"
      @click="
        emit('listenForCloseMenu');
        showBookingMenu = true;
      "
    >
      BOOK NOW
    </button>
  </div>
  <div v-else>
    <img
      src="../assets/icons/closeMenus.svg"
      alt="imaginary hotel close booking icon"
      class="w-8 h-8 cursor-pointer fixed z-50 right-1 md:right-4 top-3 hover:scale-110"
      @click="
        emit('listenForCloseBookingMenu');
        showBookingMenu = false;
      "
    />
    <BookingMenu />
  </div>
</template>
