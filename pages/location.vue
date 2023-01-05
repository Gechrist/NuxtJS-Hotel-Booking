<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';

useHead({
  title: 'Imaginary Bungalows Location',
});

const config = useRuntimeConfig().public;
const location = { lat: -13.342604092331744, lng: -176.17651199304382 };
</script>
<template>
  <div class="min-h-screen w-full">
    <div class="md:w-4/6 mx-auto my-10">
      <h1 class="font-presentational text-xl text-center">
        The Imaginary Bungalows resort does not have a physical location because
        it is not a physical entity. The map marks a random location in the
        Pacific Ocean.
      </h1>
    </div>
    <GoogleMap
      :api-key="config.GOOGLE_MAPS_API_KEY"
      :center="location"
      :zoom="7"
      language="en"
      class="w-full h-[500px] lg:h-[1000px] pb-10"
      backgroundColor="black"
    >
      <Marker
        :options="{
          position: location,
          Label: 'IB',
          title: 'Imaginary Bungalows',
        }"
      />
    </GoogleMap>
  </div>
</template>
