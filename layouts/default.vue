<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-10" />
          <span class="text-2xl font-semibold text-forest">CircularIQ</span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <!-- Show public navigation when not logged in -->
          <template v-if="!authStore.isAuthenticated">
            <NuxtLink to="/features" class="text-muted hover:text-primary transition">Features</NuxtLink>
            <NuxtLink to="/pricing" class="text-muted hover:text-primary transition">Pricing</NuxtLink>
            <NuxtLink to="/about" class="text-muted hover:text-primary transition">About</NuxtLink>
            <NuxtLink to="/contact" class="text-muted hover:text-primary transition">Contact</NuxtLink>
            <div class="flex space-x-4">
              <NuxtLink to="/login" class="px-4 py-2 rounded text-primary border border-primary hover:bg-primary hover:text-white transition">Login</NuxtLink>
              <NuxtLink to="/signup" class="px-4 py-2 rounded bg-primary text-white hover:bg-forest transition">Sign Up</NuxtLink>
            </div>
          </template>
          
          <!-- Show dashboard link when logged in -->
          <template v-else>
            <NuxtLink to="/dashboard" class="text-muted hover:text-primary transition">Dashboard</NuxtLink>
            <div class="flex items-center space-x-4">
              <span class="text-muted">Welcome, {{ userName }}</span>
              <button @click="logout" class="px-4 py-2 rounded text-primary border border-primary hover:bg-primary hover:text-white transition">
                Logout
              </button>
            </div>
          </template>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white py-4 px-4 shadow-md">
        <nav class="flex flex-col space-y-4">
          <!-- Show public navigation when not logged in -->
          <template v-if="!authStore.isAuthenticated">
            <NuxtLink to="/features" class="text-muted hover:text-primary transition">Features</NuxtLink>
            <NuxtLink to="/pricing" class="text-muted hover:text-primary transition">Pricing</NuxtLink>
            <NuxtLink to="/about" class="text-muted hover:text-primary transition">About</NuxtLink>
            <NuxtLink to="/contact" class="text-muted hover:text-primary transition">Contact</NuxtLink>
            <div class="flex flex-col space-y-2">
              <NuxtLink to="/login" class="px-4 py-2 rounded text-center text-primary border border-primary hover:bg-primary hover:text-white transition">Login</NuxtLink>
              <NuxtLink to="/signup" class="px-4 py-2 rounded text-center bg-primary text-white hover:bg-forest transition">Sign Up</NuxtLink>
            </div>
          </template>
          
          <!-- Show dashboard link when logged in -->
          <template v-else>
            <NuxtLink to="/dashboard" class="text-muted hover:text-primary transition">Dashboard</NuxtLink>
            <div class="flex flex-col space-y-2 mt-2">
              <span class="text-muted">Welcome, {{ userName }}</span>
              <button @click="logout" class="px-4 py-2 rounded text-center text-primary border border-primary hover:bg-primary hover:text-white transition">
                Logout
              </button>
            </div>
          </template>
        </nav>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-forest text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="CircularIQ Logo" class="h-8" />
              <span class="text-xl font-semibold">CircularIQ</span>
            </div>
            <p class="text-sm mb-4">Circular economy and sustainability intelligence platform for African businesses</p>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-4">Platform</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/features" class="hover:text-accent">Features</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="hover:text-accent">Pricing</NuxtLink></li>
              <li><NuxtLink to="/login" class="hover:text-accent">Login</NuxtLink></li>
              <li><NuxtLink to="/signup" class="hover:text-accent">Sign Up</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/about" class="hover:text-accent">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-accent">Contact</NuxtLink></li>
              <li><NuxtLink to="/resources" class="hover:text-accent">Resources</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/terms" class="hover:text-accent">Terms of Service</NuxtLink></li>
              <li><NuxtLink to="/privacy-policy" class="hover:text-accent">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/faqs" class="hover:text-accent">FAQs</NuxtLink></li>
            </ul>
          </div>
        </div>
        
        <div class="mt-10 pt-6 border-t border-green-700 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm">&copy; {{ new Date().getFullYear() }} CircularIQ. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="hover:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const mobileMenuOpen = ref(false);
const authStore = useAuthStore();

const userName = computed(() => {
  return authStore.userName || 'Guest';
});

// Initialize auth when component is mounted
onMounted(async () => {
  await authStore.initialize();
});

async function logout() {
  try {
    const result = await authStore.signOut();
    if (result.success) {
      // Reset auth store state
      authStore.resetState();
      // Navigate to home page
      navigateTo('/');
    } else {
      console.error('Logout failed:', result.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
</script>
