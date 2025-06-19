// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

// Extract Supabase configuration to avoid duplication
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const appUrl = process.env.APP_URL || 'http://localhost:3000';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@formkit/nuxt',
    '@nuxtjs/supabase'
  ],
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/ui', pathPrefix: false, global: true }
  ],
  app: {
    head: {
      title: 'CircularIQ',
      meta: [
        { name: 'description', content: 'Circular economy and sustainability intelligence platform for African businesses' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  runtimeConfig: {
    // Private keys that are exposed server-side only
    supabaseServiceKey,
    
    // Public keys that are exposed to the client
    public: {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
      appUrl
    }
  },
  supabase: {
    // Supabase module options
    url: supabaseUrl,
    key: supabaseAnonKey,
    serviceKey: supabaseServiceKey,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // Keep these public routes excluded from auth redirects
      // Note: auth for /data routes is now handled by our custom auth.global.js middleware
      exclude: ['/signup', '/', '/about', '/features', '/pricing', '/contact', '/privacy-policy', '/terms', '/faqs']
    }
  }
})
