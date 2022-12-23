import SetupCalendar from 'v-calendar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SetupCalendar, {});
});
