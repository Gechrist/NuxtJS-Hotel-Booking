<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  color: String,
  whiteMenu: Boolean,
});
const emit = defineEmits<{
  (listenForCloseMenu: string): void;
}>();

const showBookingMenu = ref<boolean>(false);
</script>

<template>
  <button
    v-if="!showBookingMenu"
    :class="`${
      props.whiteMenu ? 'text-white' : 'md:text-black'
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
    <!-- :class="`${
    props.whiteMenu ? 'text-white' : 'md:text-black'
  } z-50 fixed right-2 top-5 ${
    props.color == 'black' && !props.whiteMenu
      ? 'after:border-black'
      : 'after:border-white'
  }  link_rtl`" -->
    BOOK NOW
  </button>
  <div v-else>
    <img
      src="../assets/icons/closeMenus.svg"
      alt="imaginary hotel close booking icon"
      class="w-8 h-8 cursor-pointer fixed z-50 right-1 md:right-4 top-3 hover:scale-110"
      @click="showBookingMenu = false"
    />
    <BookingMenu />
  </div>
</template>
