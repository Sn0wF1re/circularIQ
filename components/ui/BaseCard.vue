<template>
  <div
    class="rounded-lg shadow bg-white overflow-hidden"
    :class="[
      elevated ? 'shadow-md' : 'shadow-sm'
    ]"
  >
    <div
      v-if="title"
      class="border-b px-6 py-4 flex items-center justify-between"
      :class="[
        headerBgClass,
        headerTextClass
      ]"
    >
      <div class="flex items-center">
        <h3 class="font-medium text-lg">{{ title }}</h3>
        <p v-if="subtitle" class="ml-2 text-sm opacity-75">{{ subtitle }}</p>
      </div>
      <div v-if="$slots && $slots.headerActions">
        <slot name="headerActions" />
      </div>
    </div>
    
    <div class="p-6" :class="{ 'px-6 py-4': compact }">
      <slot />
    </div>
    
    <div v-if="$slots && $slots.footer" class="border-t px-6 py-4 bg-surface">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  elevated: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const headerBgClass = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-primary bg-opacity-10';
    case 'success': return 'bg-success bg-opacity-10';
    case 'warning': return 'bg-warning bg-opacity-10';
    case 'danger': return 'bg-danger bg-opacity-10';
    case 'info': return 'bg-info bg-opacity-10';
    default: return 'bg-white';
  }
});

const headerTextClass = computed(() => {
  switch (props.variant) {
    case 'primary': return 'text-primary';
    case 'success': return 'text-success';
    case 'warning': return 'text-warning';
    case 'danger': return 'text-danger';
    case 'info': return 'text-info';
    default: return 'text-forest';
  }
});
</script>
