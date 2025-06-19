/**
 * Composable to interact with the Supabase API
 */
export const useSupabaseApi = () => {
  const config = useRuntimeConfig();

  /**
   * Call the Supabase API
   * @param {string} action - The action to perform
   * @param {Object} params - The parameters for the action
   * @returns {Promise} - The result of the action
   */
  const callApi = async (action, params = {}) => {
    try {
      const response = await $fetch('/api/supabase-api', {
        method: 'POST',
        body: { action, params }
      });

      if (response.error) {
        // Handle Supabase error objects properly
        if (typeof response.error === 'object') {
          const errorMessage = response.error.message || JSON.stringify(response.error);
          console.error(`Supabase API Error Details:`, response.error);
          throw new Error(errorMessage);
        } else {
          throw new Error(response.error);
        }
      }

      return response;
    } catch (error) {
      console.error(`Error in Supabase API (${action}):`, error);
      
      // Standardize the error format for consistent handling in components
      const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
      const enhancedError = new Error(errorMessage);
      enhancedError.originalError = error;
      enhancedError.action = action;
      
      throw enhancedError;
    }
  };

  // Auth methods
  const auth = {
    signUp: (email, password, userData = {}) => 
      callApi('signUp', { email, password, options: { data: userData } }),
    
    signIn: (email, password) => 
      callApi('signIn', { email, password }),
    
    signOut: () => 
      callApi('signOut'),
    
    getSession: () => 
      callApi('getSession'),
      
    resetPassword: (email) =>
      callApi('resetPassword', { email }),
      
    updatePassword: (options = {}) =>
      callApi('updatePassword', options),
      
    updateUser: (options = {}) =>
      callApi('updateUser', options),
      
    getProfile: (userId) =>
      callApi('getProfile', { userId })
  };

  // Companies methods
  const companies = {
    get: (id, select = '*') => 
      callApi('getCompany', { id, select }),
    
    create: (data) => 
      callApi('createCompany', { data }),
    
    update: (id, data) => 
      callApi('updateCompany', { id, data })
  };

  // Products methods
  const products = {
    list: (filters = {}, pagination = null, orderBy = null, select = '*') => 
      callApi('getProducts', { filters, pagination, orderBy, select }),
    
    create: (data) => 
      callApi('createProduct', { data }),
    
    update: (id, data) => 
      callApi('updateProduct', { id, data }),
    
    delete: (id) => 
      callApi('deleteProduct', { id })
  };

  // Uploads methods
  const uploads = {
    create: (data) => 
      callApi('createUpload', { data }),
    
    update: (id, data) =>
      callApi('updateUpload', { id, data }),
      
    list: (companyId) => 
      callApi('getUploads', { companyId })
  };

  // Reports methods
  const reports = {
    getFootprint: (companyId) => 
      callApi('getFootprintReports', { companyId }),
    
    createFootprint: (data) => 
      callApi('createFootprintReport', { data })
  };

  // Compliance methods
  const compliance = {
    getScores: (companyId) => 
      callApi('getComplianceScores', { companyId })
  };

  // Team management methods
  const team = {
    list: (companyId) => 
      callApi('getTeamMembers', { companyId }),
    
    invite: (email, companyId, role, tempPassword) => 
      callApi('inviteTeamMember', { email, companyId, role, tempPassword })
  };
      
  // Storage methods for file uploads
  const storage = {
    // Upload a file to Supabase Storage
    upload: (bucket, filePath, fileContent, options = {}) => 
      callApi('uploadFile', { bucket, filePath, fileContent, options }),
    
    // Generate a public URL for a file
    getPublicUrl: (bucket, filePath) => 
      callApi('getPublicUrl', { bucket, filePath }),
    
    // Generate a signed URL with temporary access
    getSignedUrl: (bucket, filePath, expiresIn = 3600) => 
      callApi('getSignedUrl', { bucket, filePath, expiresIn }),
      
    // List files in a bucket or folder
    list: (bucket, folder = '') => 
      callApi('listFiles', { bucket, folder }),
      
    // Delete a file
    delete: (bucket, filePath) => 
      callApi('deleteFile', { bucket, filePath }),
      
    // Create a bucket if it doesn't exist
    createBucket: (bucket, isPublic = false) => 
      callApi('createBucket', { bucket, isPublic })
  };

  return {
    auth,
    companies,
    products,
    uploads,
    reports,
    compliance,
    team,
    storage
  };
};
