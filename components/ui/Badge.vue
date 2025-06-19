<template>
  <div 
    class="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="[variantClasses]"
  >
    <span v-if="$slots.icon" class="mr-1">
      <slot name="icon" />
    </span>
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'primary', 'secondary', 'success', 
      'warning', 'danger', 'info', 'outline'
    ].includes(value)
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary bg-opacity-10 text-primary';
    case 'secondary':
      return 'bg-accent text-forest';
    case 'success':
      return 'bg-success bg-opacity-10 text-success';
    case 'warning':
      return 'bg-warning bg-opacity-10 text-warning';
    case 'danger':
      return 'bg-danger bg-opacity-10 text-danger';
    case 'info':
      return 'bg-info bg-opacity-10 text-info';
    case 'outline':
      return 'bg-white border border-gray-300 text-muted';
    default:
      return 'bg-gray-100 text-muted';
  }
});
</script>
