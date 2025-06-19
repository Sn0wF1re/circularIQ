<template>
  <NuxtLink 
    :to="to" 
    class="inline-flex items-center justify-center"
    :class="{ 'w-full': fullWidth }"
  >
    <BaseButton 
      :type="type"
      :size="size"
      :variant="variant"
      :full-width="fullWidth"
      :icon="icon"
      :icon-only="iconOnly"
      :icon-after="iconAfter"
      :disabled="disabled"
      :loading="loading"
      :text="text"
      class="w-full"
      @click="$emit('click', $event)"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon"></slot>
      </template>
      <slot></slot>
    </BaseButton>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
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
</script>
