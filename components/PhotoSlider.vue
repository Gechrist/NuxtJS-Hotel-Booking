<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const leisureImages: { address: string; alttext: string }[] = [
  {
    address: '/images/hand_touching_water.webp',
    alttext: 'imaginary bungalows hand in water',
  },
  {
    address: '/images/meditation.webp',
    alttext: 'imaginary bungalows meditation',
  },
  {
    address: '/images/woman_in_water.webp',
    alttext: 'imaginary bungalows woman in water',
  },
  {
    address: '/images/man_relaxing_water.webp',
    alttext: 'imaginary bungalows man relaxing water',
  },
];

interface ImageElement extends HTMLDivElement {
  src?: string;
}

const meditDiv1 = ref<HTMLDivElement | null>(null);
const meditDiv2 = ref<HTMLDivElement | null>(null);
const meditDiv3 = ref<HTMLDivElement | null>(null);
const meditDiv4 = ref<HTMLDivElement | null>(null);

const handDiv1 = ref<HTMLDivElement | null>(null);
const handDiv2 = ref<HTMLDivElement | null>(null);
const handDiv3 = ref<HTMLDivElement | null>(null);
const handDiv4 = ref<HTMLDivElement | null>(null);

const manDiv1 = ref<HTMLDivElement | null>(null);
const manDiv2 = ref<HTMLDivElement | null>(null);
const manDiv3 = ref<HTMLDivElement | null>(null);
const manDiv4 = ref<HTMLDivElement | null>(null);

const womanDiv1 = ref<HTMLDivElement | null>(null);
const womanDiv2 = ref<HTMLDivElement | null>(null);
const womanDiv3 = ref<HTMLDivElement | null>(null);
const womanDiv4 = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const medImage: HTMLImageElement = document.createElement('img');
  const handImage: HTMLImageElement = document.createElement('img');
  const womanImage: HTMLImageElement = document.createElement('img');
  const manImage: HTMLImageElement = document.createElement('img');

  let imageArrays: HTMLImageElement[] = [
    medImage,
    handImage,
    womanImage,
    manImage,
  ];
  imageArrays.map((img, index) => {
    img.alt = leisureImages[index].alttext;
    img.src = `${leisureImages[index].address}`;
    // console.log(img);
    img.onload = () => cutImageUp(img);
  });
  const cutImageUp = (image: HTMLImageElement) => {
    const handImagePieces = [];
    const womanImagePieces = [];
    const manImagePieces = [];
    const medImagePieces = [];
    for (var x = 0; x < 2; ++x) {
      for (var y = 0; y < 2; ++y) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 1280;
        canvas.height = 830;
        const context = canvas.getContext('2d');
        context!.drawImage(
          image,
          x * 1230,
          y * 830,
          1230,
          830,
          0,
          0,
          canvas.width,
          canvas.height
        );
        switch (image) {
          case medImage: {
            medImagePieces.push(canvas.toDataURL());
            break;
          }
          case handImage: {
            handImagePieces.push(canvas.toDataURL());
            break;
          }
          case manImage: {
            manImagePieces.push(canvas.toDataURL());
            break;
          }
          case womanImage: {
            womanImagePieces.push(canvas.toDataURL());
            break;
          }
          default:
            break;
        }
      }
    }

    switch (image) {
      case medImage: {
        const medImageElementA: ImageElement | null = meditDiv1.value;
        medImageElementA!.src = medImagePieces[0];
        const medImageElementB: ImageElement | null = meditDiv2.value;
        medImageElementB!.src = medImagePieces[2];
        const medImageElementC: ImageElement | null = meditDiv3.value;
        medImageElementC!.src = medImagePieces[1];
        const medImageElementD: ImageElement | null = meditDiv4.value;
        medImageElementD!.src = medImagePieces[3];
        break;
      }
      case manImage: {
        const manImageElementA: ImageElement | null = manDiv1.value;
        manImageElementA!.src = manImagePieces[0];
        const manImageElementB: ImageElement | null = manDiv2.value;
        manImageElementB!.src = manImagePieces[2];
        const manImageElementC: ImageElement | null = manDiv3.value;
        manImageElementC!.src = manImagePieces[1];
        const manImageElementD: ImageElement | null = manDiv4.value;
        manImageElementD!.src = manImagePieces[3];
        break;
      }
      case handImage: {
        const handImageElementA: ImageElement | null = handDiv1.value;
        handImageElementA!.src = handImagePieces[0];
        const handImageElementB: ImageElement | null = handDiv2.value;
        handImageElementB!.src = handImagePieces[2];
        const handImageElementC: ImageElement | null = handDiv3.value;
        handImageElementC!.src = handImagePieces[1];
        const handImageElementD: ImageElement | null = handDiv4.value;
        handImageElementD!.src = handImagePieces[3];
        break;
      }
      case womanImage: {
        const womanImageElementA: ImageElement | null = womanDiv1.value;
        womanImageElementA!.src = womanImagePieces[0];
        const womanImageElementB: ImageElement | null = womanDiv2.value;
        womanImageElementB!.src = womanImagePieces[2];
        const womanImageElementC: ImageElement | null = womanDiv3.value;
        womanImageElementC!.src = womanImagePieces[1];
        const womanImageElementD: ImageElement | null = womanDiv4.value;
        womanImageElementD!.src = womanImagePieces[3];
        break;
      }
      default:
        break;
    }
  };
});

const counter = ref<number>(0);

const imageDivs: string[] = ['.one', '.two', '.three', '.four'];

const slideFunction = (arg: string) => {
  if (arg == '+') {
    if (counter.value === 3) {
      null;
    } else {
      counter.value += 1;

      for (const imgDiv of imageDivs) {
        gsap.to(`.bg_${counter.value - 1} ${imgDiv}`, {
          xPercent:
            imgDiv == '.one' ? 100 : imgDiv == '.four' ? -100 : undefined,
          yPercent:
            imgDiv == '.two' ? 100 : imgDiv == '.three' ? -100 : undefined,
          display: 'none',
          duration: 1,
          ease: 'sine.inOut',
        });
      }
    }
  }
  if (arg == '-') {
    if (counter.value === 0) {
      null;
    } else {
      counter.value -= 1;

      for (const imgDiv of imageDivs) {
        gsap.to(`.bg_${counter.value} ${imgDiv}`, {
          xPercent: imgDiv == '.one' ? 0 : imgDiv == '.four' ? 0 : undefined,
          yPercent: imgDiv == '.two' ? 0 : imgDiv == '.three' ? 0 : undefined,
          display: 'block',
          duration: 1,
          ease: 'sine.inOut',
        });
      }
    }
  }
};
</script>
<template>
  <div class="grid grid-cols-1 w-full pb-[30px]">
    <div
      class="bg_0 row-start-1 col-start-1 z-10 w-full grid grid-cols-2 gap-0"
    >
      <div class="one relative 3xl:top-[2px]">
        <img ref="meditDiv1" src="" alt="imaginary bungalows hand in water" />
      </div>
      <div class="two relative 3xl:top-[2px] 3xl:right-[2px]">
        <img ref="meditDiv2" src="" alt="imaginary bungalows hand in water" />
      </div>
      <div class="three">
        <img ref="meditDiv3" src="" alt="imaginary bungalows hand in water" />
      </div>
      <div class="four relative 3xl:right-[2px]">
        <img ref="meditDiv4" src="" alt="imaginary bungalows hand in water" />
      </div>
    </div>
    <div class="bg_1 row-start-1 col-start-1 z-0 w-full grid grid-cols-2 gap-0">
      <div class="one relative 3xl:top-[2px]">
        <img ref="handDiv1" src="" alt="imaginary bungalows meditation" />
      </div>
      <div class="two relative 3xl:top-[2px] 3xl:right-[2px]">
        <img ref="handDiv2" src="" alt="imaginary bungalows meditation" />
      </div>
      <div class="three">
        <img ref="handDiv3" src="" alt="imaginary bungalows meditation" />
      </div>
      <div class="four relative 3xl:right-[2px]">
        <img ref="handDiv4" src="" alt="imaginary bungalows meditation" />
      </div>
    </div>
    <div
      class="bg_2 row-start-1 col-start-1 -z-10 w-full grid grid-cols-2 gap-0"
    >
      <div class="one relative 3xl:top-[2px]">
        <img ref="womanDiv1" src="" alt="imaginary bungalows woman in water" />
      </div>
      <div class="two relative 3xl:top-[2px] 3xl:right-[2px]">
        <img ref="womanDiv2" src="" alt="imaginary bungalows woman in water" />
      </div>
      <div class="three">
        <img ref="womanDiv3" src="" alt="imaginary bungalows woman in water" />
      </div>
      <div class="four relative 3xl:right-[2px]">
        <img ref="womanDiv4" src="" alt="imaginary bungalows woman in water" />
      </div>
    </div>
    <div
      class="bg_3 row-start-1 col-start-1 -z-20 w-full grid grid-cols-2 gap-0"
    >
      <div class="one relative 3xl:top-[2px]">
        <img
          ref="manDiv1"
          src=""
          alt="imaginary bungalows man relaxing water"
        />
      </div>
      <div class="two relative 3xl:top-[2px] 3xl:right-[2px]">
        <img
          ref="manDiv2"
          src=""
          alt="imaginary bungalows man relaxing water"
        />
      </div>
      <div class="three">
        <img
          ref="manDiv3"
          src=""
          alt="imaginary bungalows man relaxing water"
        />
      </div>
      <div class="four relative 3xl:right-[2px]">
        <img
          ref="manDiv4"
          src=""
          alt="imaginary bungalows man relaxing water"
        />
      </div>
    </div>

    <div
      class="absolute z-20 rounded-full bg-black/70 flex flex-col top-1/4 right-4 space-y-4"
    >
      <img
        src="../assets/icons/sliderUpArrow.svg"
        class="w-8 cursor-pointer"
        :class="{ 'opacity-50 cursor-auto': counter === 3 }"
        @click="slideFunction('+')"
      />
      <p class="text-white text-center font-functional">{{ counter + 1 }}</p>
      <img
        src="../assets/icons/sliderDownArrow.svg"
        class="w-8 cursor-pointer"
        :class="{ 'opacity-50 cursor-auto': counter === 0 }"
        @click="slideFunction('-')"
      />
    </div>
  </div>
</template>
