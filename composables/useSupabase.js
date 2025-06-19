import { createClient } from '@supabase/supabase-js';

// Store a single instance of the Supabase client
let supabaseInstance = null;

/**
 * Composable to create and access a Supabase client instance
 * This is different from useSupabaseApi.js which handles API abstraction
 * This provides direct access to the Supabase client when needed
 */
export const useSupabase = () => {
  // Return existing instance if already created
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  const config = useRuntimeConfig();
  
  // Get Supabase credentials from runtime config
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;
  
  // Create and store Supabase client if credentials are available
  if (supabaseUrl && supabaseKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
  }
  
  // Log error and return null if credentials are missing
  console.error('Supabase credentials are missing. Check your .env file and runtimeConfig.');
  return null;
};