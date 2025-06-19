<template>
  <span
    class="inline-block rounded-full w-2.5 h-2.5"
    :class="[statusColor]"
  ></span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: 'default',
    validator: (value) => ['active', 'pending', 'inactive', 'success', 'warning', 'danger', 'default'].includes(value)
  }
});

const statusColor = computed(() => {
  switch (props.status) {
    case 'active':
    case 'success':
      return 'bg-success';
    case 'pending':
    case 'warning':
      return 'bg-warning';
    case 'inactive':
    case 'danger':
      return 'bg-danger';
    default:
      return 'bg-muted';
  }
});
</script>
