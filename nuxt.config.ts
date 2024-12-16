// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  srcDir: "src",
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/prismic",
    "@pinia/nuxt",
  ],
  css: ["~/assets/styles/global.css"],
  tailwindcss: {
    cssPath: "~/assets/styles/global.css",
  },
  prismic: { endpoint: 'giga-potpot-site' },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    prerender: {
      routes: ['/', '/products', '/products/**']
    }
  },
  routeRules: {
    '/': { isr: 3600 }, // revalidate every hour
    '/products': { isr: 3600 },
    '/products/**': { isr: 3600 },
    '/**': {
      headers: {
        'Cache-Control': 'max-age=3600, s-maxage=3600'
      }
    }
  },
  build: {
    transpile: ['gsap'],
  },
  devtools: { enabled: true },
});