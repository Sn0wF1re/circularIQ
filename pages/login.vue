<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-12" />
        </div>
        <h2 class="text-center text-2xl font-bold text-forest mb-8">Sign in to your account</h2>
        
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Alert for errors -->
          <div v-if="error" class="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-4">
            {{ error }}
          </div>
          
          <!-- Email -->
          <FormInput
            v-model="email"
            type="email"
            label="Email address"
            autocomplete="email"
            :error="errors.email"
            required
            iconLeft
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </template>
          </FormInput>
          
          <!-- Password -->
          <FormInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            autocomplete="current-password"
            :error="errors.password"
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
          
          <!-- Remember Me and Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-muted">
                Remember me
              </label>
            </div>
            
            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="text-primary hover:text-forest">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              fullWidth
              :loading="loading"
              text="Sign in"
            />
          </div>
        </form>
      </div>
      
      <!-- Sign Up Link -->
      <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <p class="text-sm text-muted">
          Don't have an account?
          <NuxtLink to="/signup" class="text-primary hover:text-forest font-medium">
            Sign up now
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

// Set page metadata
useHead({
  title: 'Login - CircularIQ',
  meta: [
    { name: 'description', content: 'Sign in to your CircularIQ account to manage your sustainability data.' }
  ]
});

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Form data
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');
const errors = reactive({
  email: '',
  password: ''
});

// Form validation
const validateForm = () => {
  let isValid = true;
  errors.email = '';
  errors.password = '';
  
  if (!email.value) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  if (!password.value) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  return isValid;
};

// Handle login submission
const handleLogin = async () => {
  if (!validateForm()) return;
  
  error.value = '';
  loading.value = true;
  
  try {
    const result = await authStore.signIn(email.value, password.value, rememberMe.value);
    
    if (result.success) {
      // Check for a return path in the query params (for redirected users)
      const returnPath = route.query?.returnTo ? String(route.query.returnTo) : null;
      const safeReturnPath = returnPath && !returnPath.includes('login') && !returnPath.includes('signup') 
        ? returnPath 
        : null;
        
      // If user has completed onboarding, go to dashboard or return path, otherwise go to onboarding
      if (authStore.company && authStore.company.onboarding_completed) {
        router.push(safeReturnPath || '/dashboard');
      } else {
        router.push('/onboarding');
      }
    } else {
      error.value = result.message || 'Failed to sign in. Please check your credentials.';
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
