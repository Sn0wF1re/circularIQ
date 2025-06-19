<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-1">
      <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-muted"
      >
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
      <span v-if="hint" class="text-xs text-muted">{{ hint }}</span>
    </div>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :readonly="readonly"
        class="block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-md focus:outline-none"
        :class="[
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary',
          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '',
          iconLeft ? 'pl-10' : '',
          iconRight ? 'pr-10' : '',
          { 'opacity-70': disabled }
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <!-- Left Icon -->
      <span 
        v-if="iconLeft && $slots['icon-left']" 
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted"
      >
        <slot name="icon-left" />
      </span>
      
      <!-- Right Icon -->
      <span 
        v-if="iconRight && $slots['icon-right']" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted"
      >
        <slot name="icon-right" />
      </span>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
    
    <!-- Help Text -->
    <p v-else-if="helpText" class="mt-1 text-xs text-muted">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => [
      'text', 'password', 'email', 'number', 'tel',
      'url', 'search', 'date', 'time', 'datetime-local'
    ].includes(value)
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  iconLeft: {
    type: Boolean,
    default: false
  },
  iconRight: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  helpText: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue', 'blur', 'focus']);

// Use a combination of name property and a stable value to generate the ID
// This ensures server and client rendering have the same IDs
const id = computed(() => {
  if (props.name) {
    return props.name;
  }

  // Create a stable hash based on label or other unchanging props
  const stableBase = props.label || props.placeholder || props.type || 'input';
  const hashStr = stableBase.toLowerCase().replace(/\s+/g, '-');
  return `input-${hashStr}`;
});
</script>
