import { useAuthStore } from '~/stores/auth';

/**
 * Global authentication middleware that handles:
 * 1. Protecting authenticated routes
 * 2. Preventing authenticated users from accessing guest-only routes
 * 3. Redirecting users to appropriate pages based on authentication state
 * 4. Maintaining returnTo functionality for better UX
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware during SSR
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // Prevent flash: wait for auth initialization before proceeding
  if (!authStore.isInitialized) {
    await authStore.initialize();
  }
  
  // Define route types for cleaner code
  const isAuthRoute = to.path.startsWith('/data') 
                    || to.path.startsWith('/dashboard') 
                    || to.path.startsWith('/reports')
                    || to.path.startsWith('/team')
                    || to.path.startsWith('/compliance')
                    || to.path.startsWith('/settings');
  
  const isGuestOnlyRoute = to.path === '/login' || 
                          to.path === '/signup' || 
                          to.path === '/forgot-password' || 
                          to.path === '/reset-password';
  
  // Get the excluded routes from Nuxt config at runtime
  const config = useRuntimeConfig();
  const excludedRoutes = config?.public?.supabase?.redirectOptions?.exclude || [];
  
  // Check if the current route is explicitly excluded
  const isExcluded = excludedRoutes.some(route => {
    if (typeof route === 'string') {
      return to.path === route || to.path.startsWith(route);
    }
    return false;
  });
  
  // Get the appropriate destination based on onboarding status
  const userHomeRoute = authStore.company && authStore.company.onboarding_completed 
    ? '/dashboard' 
    : '/onboarding';
  
  // Handle guest-only routes (login, signup, etc.)
  if (isGuestOnlyRoute && authStore.isAuthenticated) {
    // Use replace: true to prevent having the login page in browser history
    return navigateTo(userHomeRoute, { replace: true });
  }
  
  // Skip auth check for public excluded routes
  if (isExcluded && !isGuestOnlyRoute) return;
  
  // Check authentication for protected routes
  if (isAuthRoute) {
    if (!authStore.isAuthenticated) {
      // Save the intended destination to redirect back after login
      return navigateTo({
        path: '/login',
        query: { returnTo: to.fullPath }
      }, { replace: true }); // Use replace to clean up navigation history
    }
  }
});
