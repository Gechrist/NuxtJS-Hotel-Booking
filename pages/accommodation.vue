<script setup lang="ts">
useHead({
  title: 'Imaginary Bungalows Accommodation',
});

type roomType = {
  title: string;
  description: string;
  price: number;
  image: string;
};

const textPlaceholder =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const rooms: Array<roomType> = [
  {
    title: 'Superior Double or Twin',
    description: textPlaceholder,
    price: 100,
    image: "~/assets/images/room.webp",
  },
  {
    title: 'Superior Triple',
    description: textPlaceholder,
    price: 150,
    image: "~/assets/images/room.webp",
  },
  {
    title: 'Two Bedroom Family Suite',
    description: textPlaceholder,
    price: 200,
    image: "~/assets/images/room.webp",
  },
  {
    title: 'Luxury Villa',
    description: textPlaceholder,
    price: 400,
    image: "~/assets/images/room.web",
  },
];
</script>

<template>
  <div class="flex flex-col justify-between w-full mx-2 space-y-4 py-14">
    <section v-for="(room, index) in rooms">
      <div v-if="index % 2 === 0" class="flex flex-row space-x-4 items-center">
        <div class="flex flex-col w-2/6 items-center">
          <img class="w-full rounded" :src="room.image" />
          <h3 class="font-semibold text-lg text-center">{{ room.title }}</h3>
          <p>Price: {{ room.price }}€/Night</p>
        </div>
        <p class="w-4/6">{{ room.description }}</p>
      </div>
      <div v-if="index % 2 !== 0" class="flex flex-row space-x-4 items-center">
        <p class="w-4/6">{{ room.description }}</p>
        <div class="flex flex-col w-2/6 items-center">
          <img class="w-full rounded" :src="room.image" />
          <h3 class="font-semibold text-lg text-center">{{ room.title }}</h3>
          <p>Price: {{ room.price }}€/Night</p>
        </div>
      </div>
    </section>
  </div>
</template>
