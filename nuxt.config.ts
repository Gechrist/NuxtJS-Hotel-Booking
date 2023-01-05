// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  build: {
    transpile: ['gsap', 'vue-google-map'],
  },
  runtimeConfig: {
    public: { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY },
  },
  routeRules: {
    '/': { static: true },
    '/about': { static: true },
    '/accommmodation': { static: true },
    '/cancellations': { static: true },
    '/contact': { static: true },
    '/features': { static: true },
    '/followus': { static: true },
    '/location': { static: true },
    '/privacypolicy': { static: true },
    '/services': { static: true },
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {
        config: 'tailwind.config.ts',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
      },
      autoprefixer: {},
    },
  },
});
