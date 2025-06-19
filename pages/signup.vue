<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-12" />
        </div>
        <h2 class="text-center text-2xl font-bold text-forest mb-2">Create your account</h2>
        <p class="text-center text-muted mb-8">Start your sustainability journey today</p>
        
        <form class="space-y-6" @submit.prevent="handleSignup">
          <!-- Alert for errors -->
          <div v-if="error" class="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-4">
            {{ error }}
          </div>
          
          <!-- Full Name -->
          <FormInput
            v-model="fullName"
            type="text"
            label="Full Name"
            autocomplete="name"
            :error="errors.fullName"
            required
            iconLeft
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </template>
          </FormInput>
          
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
          
          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="acceptTerms"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-muted">
                I agree to the 
                <NuxtLink to="/terms" class="text-primary hover:text-forest">
                  Terms of Service
                </NuxtLink> 
                and 
                <NuxtLink to="/privacy-policy" class="text-primary hover:text-forest">
                  Privacy Policy
                </NuxtLink>
              </label>
              <p v-if="errors.terms" class="mt-1 text-danger">{{ errors.terms }}</p>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              fullWidth
              :loading="loading"
              text="Create Account"
            />
          </div>
        </form>
      </div>
      
      <!-- Sign In Link -->
      <div class="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <p class="text-sm text-muted">
          Already have an account?
          <NuxtLink to="/login" class="text-primary hover:text-forest font-medium">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Set page metadata
useHead({
  title: 'Sign Up - CircularIQ',
  meta: [
    { name: 'description', content: 'Create your CircularIQ account to start your sustainability journey.' }
  ]
});

const router = useRouter();
const authStore = useAuthStore();

// Form data
const fullName = ref('');
const email = ref('');
const password = ref('');
const acceptTerms = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');
const errors = reactive({
  fullName: '',
  email: '',
  password: '',
  terms: ''
});

// Form validation
const validateForm = () => {
  let isValid = true;
  errors.fullName = '';
  errors.email = '';
  errors.password = '';
  errors.terms = '';
  
  if (!fullName.value.trim()) {
    errors.fullName = 'Full name is required';
    isValid = false;
  }
  
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
  } else if (password.value.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    isValid = false;
  } else if (!/\d/.test(password.value)) {
    errors.password = 'Password must include at least one number';
    isValid = false;
  }
  
  if (!acceptTerms.value) {
    errors.terms = 'You must accept the Terms of Service and Privacy Policy';
    isValid = false;
  }
  
  return isValid;
};

// Handle signup submission
const handleSignup = async () => {
  if (!validateForm()) return;
  
  error.value = '';
  loading.value = true;
  
  try {
    const result = await authStore.signUp(email.value, password.value, {
      full_name: fullName.value,
      role: 'Admin' // By default, the first user is an admin
    });
    
    if (result.success) {
      // Automatically sign in after successful signup
      const signInResult = await authStore.signIn(email.value, password.value);
      
      if (signInResult.success) {
        // Redirect to onboarding
        router.push('/onboarding');
      } else {
        // If auto sign-in fails, redirect to login
        router.push('/login');
      }
    } else {
      error.value = result.message || 'Failed to create account. Please try again.';
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
