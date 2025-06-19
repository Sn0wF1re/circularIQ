<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    :class="[
      sizeClasses,
      variantClasses,
      fullWidth ? 'w-full' : '',
      iconOnly ? 'p-0 flex items-center justify-center' : '',
      { 'opacity-70 cursor-not-allowed': disabled }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 inline-block">
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <span v-if="icon && !iconAfter" class="mr-2">
      <slot name="icon"></slot>
    </span>
    <span v-if="!iconOnly">
      <slot>{{ props.text }}</slot>
    </span>
    <span v-else>
      <slot name="icon"></slot>
    </span>
    <span v-if="icon && iconAfter" class="ml-2">
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'outline', 'ghost', 
      'success', 'warning', 'danger', 'info'
    ].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  iconAfter: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

// Size classes
const sizeClasses = computed(() => {
  if (props.iconOnly) {
    switch (props.size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-12 w-12';
      case 'xl': return 'h-14 w-14';
      default: return 'h-10 w-10';
    }
  }

  switch (props.size) {
    case 'sm': return 'text-xs px-3 py-1.5';
    case 'lg': return 'text-base px-6 py-3';
    case 'xl': return 'text-lg px-8 py-4';
    default: return 'text-sm px-4 py-2';
  }
});

// Variant classes
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-hover hover:text-white';
    case 'secondary':
      return 'bg-accent bg-opacity-20 text-forest hover:bg-accent hover:bg-opacity-30 hover:text-forest-hover';
    case 'outline':
      return 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white';
    case 'ghost':
      return 'bg-transparent text-primary hover:bg-primary hover:bg-opacity-10 hover:text-primary-hover';
    case 'success':
      return 'bg-success text-white hover:bg-success hover:brightness-90 hover:text-white';
    case 'warning':
      return 'bg-warning text-white hover:bg-warning hover:brightness-90 hover:text-white';
    case 'danger':
      return 'bg-danger text-white hover:bg-danger hover:brightness-90 hover:text-white';
    case 'info':
      return 'bg-info text-white hover:bg-info hover:brightness-90 hover:text-white';
    default:
      return 'bg-primary text-white hover:bg-primary-hover hover:text-white';
  }
});
</script>
