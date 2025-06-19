<template>
  <div class="min-h-screen bg-background flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationContainer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { provideNotifications } from '@/composables/useNotification';
import { useAuthStore } from '@/stores/auth';

// Setup the notification system for the entire app
provideNotifications();

// Initialize the auth store on app load
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initialize();
});
</script>

<style>
html, body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
