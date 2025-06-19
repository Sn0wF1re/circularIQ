<template>
  <div class="flex min-h-screen bg-background">
      <!-- Sidebar -->
      <aside :class="[
        'bg-forest text-white w-64 fixed inset-y-0 z-30 flex flex-col transition-all duration-300 overflow-y-auto h-screen',
        sidebarOpen ? 'left-0' : '-left-64 md:left-0'
      ]">
        <!-- Logo -->
        <div class="flex items-center justify-between p-4 border-b border-green-700">
          <div class="flex items-center space-x-2">
            <img src="/logo.png" alt="CircularIQ Logo" class="h-8" />
            <span class="text-lg font-semibold">CircularIQ</span>
          </div>
          <button @click="sidebarOpen = false" class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Navigation Menu -->
        <nav class="flex-1 py-4 px-2 overflow-y-auto">
          <div class="space-y-1">
            <NuxtLink to="/dashboard" class="sidebar-link" :class="{ 'active': route.path === '/dashboard' }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </NuxtLink>
            
            <NuxtLink to="/data" class="sidebar-link" :class="{ 'active': route.path.startsWith('/data') }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Data Collection</span>
            </NuxtLink>
            
            <NuxtLink to="/reports" class="sidebar-link" :class="{ 'active': route.path.startsWith('/reports') }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Reports</span>
            </NuxtLink>
            
            <NuxtLink to="/compliance" class="sidebar-link" :class="{ 'active': route.path.startsWith('/compliance') }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Compliance</span>
            </NuxtLink>
            
            <NuxtLink to="/team" class="sidebar-link" :class="{ 'active': route.path.startsWith('/team') }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Team</span>
            </NuxtLink>
            
            <NuxtLink to="/settings" class="sidebar-link" :class="{ 'active': route.path.startsWith('/settings') }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </NuxtLink>
          </div>
        </nav>
        
        <!-- User Section -->
        <div class="p-4 border-t border-[rgba(20,83,45,0.4)]">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="rounded-full bg-accent h-8 w-8 flex items-center justify-center text-forest font-semibold">
                {{ userInitials }}
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium">{{ userName }}</p>
                <p class="text-xs text-[rgb(152,255,152)]">{{ userRole }}</p>
              </div>
            </div>
            
            <button @click="logout" class="text-[rgb(152,255,152)] hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      
      <!-- Main Content Area -->
      <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
        <!-- Top Header -->
        <header class="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center">
            <button @click="sidebarOpen = !sidebarOpen" class="md:hidden mr-4 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          
          <h1 class="text-xl font-semibold text-forest">{{ pageTitle }}</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <button class="text-muted hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="bg-danger text-white absolute top-0 right-0 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </button>
          </div>
          
          <!-- Help -->
          <button class="text-muted hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="p-6 flex-grow overflow-y-auto">
        <slot />
      </main>
      
      <!-- Footer -->
      <footer class="bg-forest text-white py-4 px-6 z-10 mt-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2 mb-2 md:mb-0">
            <img src="/logo.png" alt="CircularIQ Logo" class="h-6" />
            <span class="text-sm font-semibold">CircularIQ</span>
          </div>
          <p class="text-xs">&copy; {{ new Date().getFullYear() }} CircularIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
    
    <!-- Overlay for Mobile Sidebar -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);

// These values would typically come from your auth state/store
const userName = ref('John Doe');
const userRole = ref('Admin');
const userInitials = computed(() => {
  const nameParts = userName.value.split(' ');
  return nameParts.map(part => part[0]).join('');
});

// Page title based on current route
const pageTitle = computed(() => {
  if (route.path === '/dashboard') return 'Dashboard';
  if (route.path.startsWith('/data')) return 'Data Collection';
  if (route.path.startsWith('/reports')) return 'Reports';
  if (route.path.startsWith('/compliance')) return 'Compliance';
  if (route.path.startsWith('/team')) return 'Team Management';
  if (route.path.startsWith('/settings')) return 'Settings';
  
  return 'CircularIQ';
});

// Logout function
const logout = async () => {
  // Handle logout logic here
  router.push('/login');
};
</script>

<style scoped>

</style>
