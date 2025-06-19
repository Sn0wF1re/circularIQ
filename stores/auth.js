import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const session = ref(null);
  const loading = ref(false);
  const company = ref(null);
  const isInitialized = ref(false);
  
  // Getters
  const isAuthenticated = computed(() => !!user.value);
  
  const userName = computed(() => {
    if (!user.value) return '';
    return user.value.user_metadata?.full_name || user.value.email;
  });
  
  const userInitials = computed(() => {
    if (!user.value) return '';
    const name = user.value.user_metadata?.full_name || user.value.email;
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  });
  
  const userRole = computed(() => {
    return user.value?.user_metadata?.role || 'User';
  });
  
  const companyId = computed(() => {
    return user.value?.user_metadata?.company_id || company.value?.id;
  });

  // Actions
  async function initialize() {
    // If already initialized and has user, no need to re-initialize
    if (isInitialized.value && user.value) {
      return;
    }
    
    loading.value = true;
    try {
      // First, try to get session directly from Supabase client
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (supabase) {
        const { data: clientData, error: clientError } = await supabase.auth.getSession();
        
        if (clientData?.session) {
          setSession(clientData.session);
          setUser(clientData.session.user);
          
          // If user has a company, fetch company details
          if (clientData.session.user.user_metadata?.company_id) {
            await fetchCompany(clientData.session.user.user_metadata.company_id);
          }
          isInitialized.value = true;
          return;
        } else if (clientError) {
          console.error('Error getting session from client:', clientError);
        }
      }
      
      // Fallback to API route if direct client access fails
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      const { data } = await auth.getSession();
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        
        // If user has a company, fetch company details
        if (data.session.user.user_metadata?.company_id) {
          await fetchCompany(data.session.user.user_metadata.company_id);
        }
      }
    } catch (error) {
      console.error('Error initializing auth store:', error);
    } finally {
      loading.value = false;
    }
  }
  
  function setUser(userData) {
    console.log('Setting user data in auth store:', userData);
    user.value = userData;
    isInitialized.value = true;
  }
  
  function setSession(sessionData) {
    session.value = sessionData;
  }
  
  function setCompanyData(companyData) {
    company.value = companyData;
  }
  
  function setCompany(companyData) {
    company.value = companyData;
    // Also update user metadata if possible
    if (user.value && companyData?.id) {
      user.value.user_metadata = {
        ...user.value.user_metadata,
        company_id: companyData.id
      };
    }
  }
  
  async function fetchCompany(id) {
    try {
      console.log('Fetching company data for ID:', id);
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { companies } = useSupabaseApi();
      
      const { data, error } = await companies.get(id);
      
      if (error) {
        console.error('Error fetching company:', error);
        return;
      }
      
      console.log('Company data retrieved:', data);
      if (data) {
        company.value = data;
      } else {
        console.warn('No company data found for ID:', id);
      }
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  }
  
  async function signIn(email, password) {
    loading.value = true;
    try {
      // First try direct Supabase client authentication
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (supabase) {
        const { data: directData, error: directError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (!directError && directData?.user) {
          setUser(directData.user);
          setSession(directData.session);
          
          // If user has a company, fetch company details
          if (directData.user.user_metadata?.company_id) {
            await fetchCompany(directData.user.user_metadata.company_id);
          }
          return { success: true };
        }
        
        // If error is not auth-related, throw it
        if (directError && !directError.message?.includes('auth')) {
          throw directError;
        }
      }
      
      // Fall back to API method if direct method fails or isn't available
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      
      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
        
        // If user has a company, fetch company details
        if (data.user.user_metadata?.company_id) {
          await fetchCompany(data.user.user_metadata.company_id);
        }
        return { success: true };
      }
      
      return { success: false, message: 'Failed to sign in' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: error.message || 'An error occurred during sign in' };
    } finally {
      loading.value = false;
    }
  }
  
  async function signUp(email, password, userData = {}) {
    loading.value = true;
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      const { data, error } = await auth.signUp(email, password, userData);
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      loading.value = false;
    }
  }
  
  async function signOut() {
    loading.value = true;
    try {
      let signOutSuccess = false;
      
      // Try direct Supabase client first
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (supabase) {
        const { error: directError } = await supabase.auth.signOut();
        if (!directError) {
          signOutSuccess = true;
        }
      }
      
      if (!signOutSuccess) {
        // Fall back to API method
        const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
        const { auth } = useSupabaseApi();
        
        const { error } = await auth.signOut();
        if (error) throw error;
        signOutSuccess = true;
      }
      
      // Reset state regardless of method used
      resetState();
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, message: error.message || 'An error occurred during sign out' };
    } finally {
      loading.value = false;
    }
  }
  
  function resetState() {
    user.value = null;
    session.value = null;
    loading.value = false;
    company.value = null;
  }
  
  async function resetPassword(email) {
    loading.value = true;
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      const { error } = await auth.resetPassword(email);
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      loading.value = false;
    }
  }
  
  async function updatePassword(token, password) {
    loading.value = true;
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      const { error } = await auth.updatePassword(token, password);
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      loading.value = false;
    }
  }
  
  return {
    // State
    user,
    session,
    loading,
    company,
    
    // Getters
    isAuthenticated,
    userName,
    userInitials,
    userRole,
    companyId,
    
    // Actions
    initialize,
    setUser,
    setSession,
    setCompanyData,
    setCompany,
    fetchCompany,
    signIn,
    signUp,
    signOut,
    resetState,
    resetPassword,
    updatePassword
  };
});