<script setup lang="ts">
import { ComputedRef, type PropType } from 'vue';
import { type bookingDates } from './BookingMenu.vue';
import { ref, reactive } from 'vue';

const fName = ref<string | null>('');
const lName = ref<string | null>('');
const country = ref<string | null>('');
const tel = ref<string | null>('');
const email = ref<string | null>('');
const err = ref<string | null>(null);
const loading = ref<boolean>(false);
const confirmed = ref<boolean>(false);
let controller: AbortController | null = null;

const error = reactive<{
  country: boolean;
  tel: string;
  email: string;
  fName: string;
  lName: string;
}>({ country: false, tel: '', email: '', fName: '', lName: '' });

const props = defineProps({
  dates: { type: Object as PropType<bookingDates | undefined>, required: true },
  rType: String,
  rPrice: Number,
  bookedUnits: Number,
  visitors: Number,
  availableUnits: Array<string>,
});

const bookedDays: ComputedRef<number> = computed(() => {
  let date_1 = new Date(props.dates!.end.toString());
  let date_2 = new Date(props.dates!.start.toString());

  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
});

const bookingTotal: ComputedRef<number | undefined> = computed(() => {
  if (props.rPrice && props.bookedUnits) {
    return props.rPrice * props.bookedUnits * bookedDays.value;
  }
});

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'The Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo, Democratic Republic of the',
  'Congo, Republic of the',
  'Costa Rica',
  'Côte d’Ivoire',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor (Timor-Leste)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'The Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, North',
  'Korea, South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia, Federated States of',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Sudan, South',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
const validateForm = () => {
  if (!email.value) {
    return (error.email = 'Please enter your email address');
  } else {
    if (
      email.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      error.email = '';
    } else {
      return (error.email = 'Please enter a valid email address');
    }
  }
  if (!tel.value) {
    return (error.tel = 'Please enter your telephone number');
  } else {
    if (tel.value.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)) {
      error.tel = '';
    } else {
      return (error.tel = 'Please enter a valid telephone number');
    }
  }
  if (!fName.value) {
    return (error.fName = 'Please enter your first name');
  } else {
    error.fName = '';
  }
  if (!lName.value) {
    return (error.lName = 'Please enter your last name');
  } else {
    error.lName = '';
  }
  if (!country.value) {
    return (error.country = true);
  } else {
    error.country = false;
  }
  bookRooms();
};

const bookRooms = async () => {
  let bookedRoomNumbers: Array<string> = [];
  if (props.bookedUnits && props.availableUnits) {
    for (let i = 0; i < props.bookedUnits; i++) {
      bookedRoomNumbers.push(props.availableUnits[i]);
    }
  }
  loading.value = true;
  clearNuxtData();
  controller?.abort();
  try {
    controller = new AbortController();
    const {
      data: response,
      pending,
      error,
    } = await useFetch<void>(
      `/api/bookRooms?startDate=${props.dates!.start}&endDate=${
        props.dates!.end
      }&fName=${fName.value}&lName=${
        lName.value
      }&bookedUnits=${bookedRoomNumbers}`,
      { signal: controller.signal }
    );
    if (response.value == 'confirmed') {
      confirmed.value = true;
    }
    if (error.value) {
      console.log(error.value);
      return (err.value =
        'Something went wrong. If the error persists, please contact the administrator');
    }
    loading.value = pending.value;
  } catch (e: any) {
    err.value =
      'Something went wrong. If the error persists, please contact the administrator';
    console.log(e.message);
  }
};
const formattedStartDate = computed(() => {
  return props.dates!.start.toString().substring(0, 15);
});
const formattedEndDate = computed(() => {
  return props.dates!.end.toString().substring(0, 15);
});
</script>

<template>
  <div>
    <div
      class="flex flex-col items-center justify-center h-screen"
      v-if="loading"
    >
      <img src=../assets/icons/threeDots.svg alt="loading icon" class='w-28' />
    </div>
    <div v-if="confirmed">
      <bookingConfirmed
        :startDate="formattedStartDate"
        :endDate="formattedEndDate"
        :price="bookingTotal"
        :rType="props.rType"
      />
    </div>
    <div class="w-5/6 md:w-4/6 text-white mx-auto h-auto" v-if="!confirmed">
      <h2 class="text-2xl mt-8 mb-2 text-center">Book your accommodation</h2>
      <div class="flex flex-col space-y-2 lg:flex-row lg:space-x-3">
        <form class="flex flex-col justify-between space-y-4 lg:w-4/6">
          <fieldset class="border-2 border-white rounded">
            <label
              for="guestCountry"
              class="bg-cyan-700 relative -top-3 lg:-top-4 left-1"
              >Country *</label
            >
            <select
              id="guestCountry"
              v-model="country"
              class="w-full pl-1 relative -top-3 bg-cyan-700 text-white outline-none"
            >
              <option value="" disabled selected>Select your country</option>
              <option v-for="country in countries" :value="country">
                {{ country }}
              </option>
            </select>
          </fieldset>
          <span v-if="error.country">Please select your country</span>
          <fieldset class="flex flex-row space-x-2">
            <div class="w-1/2">
              <fieldset class="w-full border-2 border-white rounded">
                <label
                  for="fName"
                  class="bg-cyan-700 relative -top-3 lg:-top-4 left-1"
                  >First Name *</label
                >
                <input
                  id="fName"
                  v-model="fName"
                  type="text"
                  class="w-full pl-1 relative -top-3 bg-cyan-700 text-white outline-none"
                />
              </fieldset>
              <span v-if="error.fName">{{ error.fName }}</span>
            </div>
            <div class="w-1/2">
              <fieldset class="w-full border-2 border-white rounded">
                <label
                  for="lName"
                  class="bg-cyan-700 relative -top-3 lg:-top-4 left-1"
                  >Last Name *</label
                >
                <input
                  id="lName"
                  v-model="lName"
                  type="text"
                  class="w-full pl-1 relative -top-3 bg-cyan-700 text-white outline-none"
                />
              </fieldset>
              <span v-if="error.lName">{{ error.lName }}</span>
            </div>
          </fieldset>
          <fieldset class="flex flex-row space-x-2">
            <div class="w-1/2">
              <fieldset class="w-full border-2 border-white rounded">
                <label
                  for="tel"
                  class="bg-cyan-700 relative -top-3 lg:-top-4 left-1"
                  >Telephone *</label
                >
                <input
                  id="tel"
                  v-model="tel"
                  type="tel"
                  class="w-full pl-1 relative -top-3 bg-cyan-700 text-white outline-none"
                />
              </fieldset>
              <span v-if="error.tel">{{ error.tel }}</span>
            </div>
            <div class="w-1/2">
              <fieldset class="w-full border-2 border-white rounded">
                <label
                  for="email"
                  class="bg-cyan-700 relative -top-3 lg:-top-4 left-1"
                  >Email *</label
                >
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="w-full pl-1 relative -top-3 bg-cyan-700 text-white outline-none"
                />
              </fieldset>
              <span v-if="error.email">{{ error.email }}</span>
            </div>
          </fieldset>
          <button
            class="w-full mt-4 rounded bg-white text-black px-2 py-1 active:bg-blue-800"
            @click.prevent="validateForm()"
          >
            Confirm and Book
          </button>
        </form>
        <section class="flex flex-col space-y-4 lg:text-sm lg:w-2/6 h-full">
          <p class="text-center font-presentational text-2xl">
            Imaginary Bungalows
          </p>
          <p class="text-center text-xl">{{ props.rType }}</p>
          <table class="w-full">
            <tbody>
              <tr>
                <td class="text-left">Rate:</td>
                <td class="text-right">{{ props.rPrice }}€/Night</td>
              </tr>
              <tr>
                <td class="text-left">Units:</td>
                <td class="text-right">{{ props.bookedUnits }}</td>
              </tr>
              <tr>
                <td class="text-left">Check-in:</td>
                <td class="text-right w-full">
                  {{ formattedStartDate }} 12:00 P.M.
                </td>
              </tr>
              <tr>
                <td class="text-left">Check-out:</td>
                <td class="text-right w-full">
                  {{ formattedEndDate }} 12:00 P.M.
                </td>
              </tr>
              <tr>
                <td class="text-left">Guests:</td>
                <td class="text-right">{{ props.visitors }}</td>
              </tr>
              <tr class="text-xl">
                <td class="text-left">Booking Total:</td>
                <td class="text-right">{{ bookingTotal }}€</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>
