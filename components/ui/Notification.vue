<template>
  <div 
    class="notification fixed bg-white shadow-lg rounded-lg p-4 mb-4 border-l-4 max-w-md"
    :class="[
      'border-' + notification.type,
      closing ? 'notification-exit' : 'notification-enter'
    ]"
  >
    <div class="flex items-start">
      <!-- Icon based on notification type -->
      <div class="flex-shrink-0 mr-3">
        <svg v-if="notification.type === 'success'" class="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else-if="notification.type === 'danger'" class="h-5 w-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else-if="notification.type === 'warning'" class="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <svg v-else class="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Notification content -->
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium" :class="`text-${notification.type}`">{{ notification.title }}</h3>
          <button @click="close" class="ml-4 text-gray-400 hover:text-gray-500">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div v-if="notification.message" class="mt-1 text-sm text-gray-600">
          {{ notification.message }}
        </div>
      </div>
    </div>
    
    <!-- Progress bar if a timeout is set -->
    <div 
      v-if="notification.timeout > 0"
      class="absolute bottom-0 left-0 h-1 bg-current transition-all"
      :class="`bg-${notification.type}`"
      :style="{ width: `${progress}%`, opacity: 0.5 }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  notification: {
    type: Object,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['close']);
const closing = ref(false);
const progress = ref(100);
let progressInterval = null;

// Handle notification close
function close() {
  if (closing.value) return;
  
  closing.value = true;
  setTimeout(() => {
    emit('close');
    props.onClose(props.notification.id);
  }, 300); // Transition time
}

// Initialize progress bar
onMounted(() => {
  if (props.notification.timeout > 0) {
    const intervalTime = 50; // Update interval in ms
    const steps = props.notification.timeout / intervalTime;
    const decrement = 100 / steps;
    
    progressInterval = setInterval(() => {
      progress.value -= decrement;
      if (progress.value <= 0) {
        close();
      }
    }, intervalTime);
  }
});

// Clean up interval on component unmount
onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
</script>

<style scoped>
.notification {
  z-index: 50;
  transition: all 0.3s ease-in-out;
}

.notification-enter {
  opacity: 1;
  transform: translateY(0);
}

.notification-exit {
  opacity: 0;
  transform: translateY(-20px);
}

/* Custom border colors */
.border-success {
  border-left-color: #34D399;
}

.border-danger {
  border-left-color: #EF4444;
}

.border-warning {
  border-left-color: #FBBF24;
}

.border-info {
  border-left-color: #3B82F6;
}

/* Custom text colors to match border */
.text-success {
  color: #34D399;
}

.text-danger {
  color: #EF4444;
}

.text-warning {
  color: #FBBF24;
}

.text-info {
  color: #3B82F6;
}

/* Custom progress bar colors */
.bg-success {
  background-color: #34D399;
}

.bg-danger {
  background-color: #EF4444;
}

.bg-warning {
  background-color: #FBBF24;
}

.bg-info {
  background-color: #3B82F6;
}
</style>