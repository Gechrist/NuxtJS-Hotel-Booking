<script setup lang="ts">
useHead({
  title: 'Imaginary Bungalows Services',
});
const servicesDesc =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
</script>
<template>
  <div class="w-full min-h-screen p-4">
    <div class="py-6">
      <img
        class="float-right w-3/6 p-2"
        src="/images/chef.webp"
        alt="Imaginary Bungalows chef"
      />
      <p class="lg:text-xl">{{ servicesDesc }}{{ servicesDesc }}</p>
    </div>
    <div class="py-6">
      <img
        class="float-left w-3/6 p-2"
        src="/images/massage.webp"
        alt="Imaginary Bungalows massage"
      />
      <p class="lg:text-xl">{{ servicesDesc }}{{ servicesDesc }}</p>
    </div>
    <div class="py-6">
      <img
        class="float-right w-3/6 p-2"
        src="/images/jacuzzi.webp"
        alt="Imaginary Bungalows jacuzzi"
      />
      <p class="lg:text-xl">{{ servicesDesc }}{{ servicesDesc }}</p>
    </div>
    <div class="py-6 md:pb-20">
      <img
        class="float-left w-3/6 p-2"
        src="/images/haka.webp"
        alt="Imaginary Bungalows haka show"
      />
      <p class="lg:text-xl">{{ servicesDesc }}{{ servicesDesc }}</p>
    </div>
  </div>
</template>
