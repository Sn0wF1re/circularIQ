<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-12" />
        </div>
        <h2 class="text-center text-2xl font-bold text-forest mb-2">Create New Password</h2>
        <p class="text-center text-muted mb-8">Enter a new password for your account</p>
        
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Alert for errors -->
          <div v-if="error" class="bg-danger bg-opacity-10 text-danger px-4 py-3 rounded-md mb-4">
            {{ error }}
          </div>
          
          <!-- Password -->
          <FormInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="New Password"
            autocomplete="new-password"
            :error="errors.password"
            required
            iconLeft
            iconRight
            helpText="Password must be at least 8 characters and include a number"
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </template>
            <template #icon-right>
              <button type="button" @click="showPassword = !showPassword" class="focus:outline-none">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </template>
          </FormInput>
          
          <!-- Confirm Password -->
          <FormInput
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            autocomplete="new-password"
            :error="errors.confirmPassword"
            required
            iconLeft
            iconRight
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </template>
            <template #icon-right>
              <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="focus:outline-none">
                <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </template>
          </FormInput>
          
          <!-- Submit Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              fullWidth
              :loading="loading"
              text="Reset Password"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';

// Set page metadata
useHead({
  title: 'Reset Password - CircularIQ',
  meta: [
    { name: 'description', content: 'Create a new password for your CircularIQ account.' }
  ]
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { notify } = useNotification();

// Form data
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const error = ref('');
const errors = reactive({
  password: '',
  confirmPassword: ''
});

// Extract token from URL
const token = ref('');

onMounted(() => {
  // Get token from query parameters
  token.value = route.query.token;
  
  if (!token.value) {
    error.value = 'Invalid or expired password reset link. Please request a new one.';
  }
});

// Form validation
const validateForm = () => {
  let isValid = true;
  errors.password = '';
  errors.confirmPassword = '';
  
  if (!password.value) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (password.value.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    isValid = false;
  } else if (!/\d/.test(password.value)) {
    errors.password = 'Password must include at least one number';
    isValid = false;
  }
  
  if (!confirmPassword.value) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const handleSubmit = async () => {
  if (!token.value) {
    error.value = 'Invalid or expired password reset link. Please request a new one.';
    return;
  }
  
  if (!validateForm()) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    const result = await authStore.updatePassword(token.value, password.value);
    
    if (result.success) {
      notify({
        title: 'Success',
        message: 'Your password has been reset successfully. You can now login with your new password.',
        type: 'success'
      });
      
      // Redirect to login page
      router.push('/login');
    } else {
      error.value = result.message || 'Failed to reset password. Please try again.';
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
