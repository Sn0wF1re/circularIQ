<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-12" />
        </div>
        <h2 class="text-center text-2xl font-bold text-forest mb-2">Reset Your Password</h2>
        <p class="text-center text-muted mb-8">Enter your email and we'll send you a link to reset your password</p>
        
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Alert for success/error -->
          <div v-if="formStatus.message" 
               :class="`px-4 py-3 rounded-md ${formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`">
            {{ formStatus.message }}
          </div>
          
          <!-- Email -->
          <FormInput
            v-model="email"
            type="email"
            label="Email address"
            autocomplete="email"
            :error="error"
            required
            iconLeft
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </template>
          </FormInput>
          
          <!-- Submit Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              fullWidth
              :loading="loading"
              text="Send Reset Link"
            />
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <NuxtLink to="/login" class="text-primary hover:text-forest text-sm">
            Return to login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';

// Set page metadata
useHead({
  title: 'Reset Password - CircularIQ',
  meta: [
    { name: 'description', content: 'Reset your CircularIQ account password.' }
  ]
});

const authStore = useAuthStore();
const { notify } = useNotification();

// Form data
const email = ref('');
const loading = ref(false);
const error = ref('');
const formStatus = ref({
  message: '',
  type: ''
});

// Email validation
const validateEmail = () => {
  if (!email.value) {
    error.value = 'Email is required';
    return false;
  }
  
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Please enter a valid email address';
    return false;
  }
  
  error.value = '';
  return true;
};

// Form submission
const handleSubmit = async () => {
  if (!validateEmail()) return;
  
  loading.value = true;
  formStatus.value = { message: '', type: '' };
  
  try {
    // Use the auth store to send password reset email
    const result = await authStore.resetPassword(email.value);
    
    if (result.success) {
      formStatus.value = {
        message: 'Password reset link sent! Please check your email.',
        type: 'success'
      };
      
      notify({
        title: 'Email Sent',
        message: 'Check your inbox for password reset instructions',
        type: 'success'
      });
      
      // Clear the form
      email.value = '';
    } else {
      formStatus.value = {
        message: result.message || 'Failed to send reset link. Please try again.',
        type: 'error'
      };
    }
  } catch (err) {
    formStatus.value = {
      message: 'An unexpected error occurred. Please try again.',
      type: 'error'
    };
  } finally {
    loading.value = false;
  }
};
</script>