<template>
  <div class="notification-container fixed top-4 right-4 z-50 space-y-4">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      :onClose="(id) => removeNotification(id)"
      @close="removeNotification(notification.id)"
    />
  </div>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification';
import { computed } from 'vue';

// Get notifications from the composable
const { notifications, remove: removeNotification } = useNotification();

// Optional: Sort notifications if needed
const sortedNotifications = computed(() => {
  // You could prioritize notifications here if needed
  // For now, we're just returning the notifications as is
  return notifications.value;
});
</script>

<style scoped>
.notification-container {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  pointer-events: none; /* Allow clicking through the container */
}

.notification-container > * {
  pointer-events: auto; /* Re-enable pointer events for notifications */
}

/* Animation classes used in Notification component */
.notification-enter {
  animation: slide-in 0.3s ease forwards;
}

.notification-exit {
  animation: slide-out 0.3s ease forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>