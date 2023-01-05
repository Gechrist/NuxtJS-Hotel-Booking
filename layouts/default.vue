<script setup lang="ts">
import { ref } from 'vue';
import TheFooter from '../components/TheFooter.vue';

const showMenu = ref<boolean>(false);
const whiteMenu = ref<boolean>(false);
</script>
<template>
  <div class="relative">
    <nav
      ref="closeMenu"
      v-show="!showMenu"
      class="sticky top-0 z-40 flex flex-row justify-between"
    >
      <MenuIcon
        :whiteMenu="whiteMenu"
        @click="showMenu = true"
        class="w-12 h-12 md:w-18 md:h-18 cursor-pointer absolute top-2 hover:scale-110"
      />
    </nav>
    <nav
      v-show="showMenu"
      class="sticky z-40 top-0 flex flex-row justify-between"
    >
      <div
        class="flex-row flex cursor-pointer absolute z-50 top-2 text-white items-center hover:scale-110"
        @click="showMenu = false"
      >
        <img
          src="../assets/icons/closeMenus.svg"
          alt="close menu icon"
          class="h-12 w-12"
        />
        CLOSE
      </div>
      <TheMenu
        :setShowMenu="showMenu"
        @listen-for-route-change="showMenu = false"
      />
    </nav>
    <BookNowButton
      :color="`${showMenu ? 'white' : 'black'}`"
      :whiteMenu="whiteMenu"
      @listen-for-close-menu="showMenu = false"
    />
    <slot />
    <footer>
      <TheFooter
        @listen-for-white-menu="whiteMenu = true"
        @listen-for-black-menu="whiteMenu = false"
      />
    </footer>
  </div>
</template>
