import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  // Get request body
  const body = await readBody(event);
  
  if (!body || !body.action) {
    return { error: 'Invalid request. Action is required.' };
  }
  
  // Initialize Supabase client from runtime config
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;
  const serviceKey = config.supabaseServiceKey;
  
  // Log configuration for debugging
  console.log('Supabase config:', { 
    hasUrl: !!supabaseUrl, 
    hasKey: !!supabaseKey,
    hasServiceKey: !!serviceKey
  });
  
  // Check if configuration is valid
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase configuration missing');
    return { error: 'Supabase configuration is missing' };
  }
  
  if (!supabaseUrl || !supabaseKey) {
    return { error: 'Supabase configuration is missing' };
  }
  
  // Create standard client with anon key
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Create admin client with service role key for admin operations
  const adminClient = serviceKey ? createClient(supabaseUrl, serviceKey) : null;
  
  try {
    // Handle different actions
    switch (body.action) {
      // Authentication
      case 'signUp':
        return await supabase.auth.signUp(body.params);
      
      case 'signIn':
        return await supabase.auth.signInWithPassword(body.params);
      
      case 'signOut':
        return await supabase.auth.signOut();
      
      case 'getSession':
        return await supabase.auth.getSession();
        
      case 'resetPassword':
        return await supabase.auth.resetPasswordForEmail(
          body.params.email,
          { redirectTo: `${config.public.appUrl || 'http://localhost:3000'}/reset-password` }
        );
        
      case 'updatePassword':
        try {
          const { currentPassword, newPassword } = body.params;
          
          // If updating with current password and new password
          if (currentPassword && newPassword) {
            // Get the current user's email
            const { data: sessionData } = await supabase.auth.getSession();
            const userEmail = sessionData?.session?.user?.email;
            
            if (!userEmail) {
              return { error: 'No active session found' };
            }
            
            // First verify the current password by trying to sign in
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: userEmail,
              password: currentPassword
            });
            
            if (signInError) {
              return { error: 'Current password is incorrect' };
            }
            
            // Then update to the new password
            return await supabase.auth.updateUser({ 
              password: newPassword
            });
          }
          
          // Simple password update (from reset password flow)
          return await supabase.auth.updateUser({
            password: body.params.password
          });
        } catch (error) {
          console.error('Error updating password:', error);
          return { error: error.message || 'Failed to update password' };
        }
        
      case 'updateUser':
        try {
          // Update user metadata
          return await supabase.auth.updateUser({
            data: body.params.data
          });
        } catch (error) {
          console.error('Error updating user:', error);
          return { error: error.message || 'Failed to update user data' };
        }
        
      case 'getProfile':
        try {
          const { userId } = body.params;
          
          if (!userId) {
            return { error: 'User ID is required' };
          }
          
          // Get user profile from the profiles table
          return await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        } catch (error) {
          console.error('Error fetching profile:', error);
          return { error: error.message || 'Failed to fetch profile' };
        };
      
      // Companies
      case 'getCompany':
        try {
          console.log('Getting company with ID:', body.params.id);
          const { data, error } = await supabase
            .from('companies')
            .select(body.params?.select || '*')
            .eq('id', body.params.id)
            .single();
          
          if (error) {
            console.error('Error fetching company:', error);
          }
          
          console.log('Company data fetched:', data);
          return { data, error };
        } catch (err) {
          console.error('Exception in getCompany:', err);
          return { error: err.message || 'Failed to fetch company data' };
        }
      
      case 'createCompany':
        try {
          console.log('Creating company with data:', body.params.data);
          
          // Validate required fields
          const requiredFields = ['name', 'registration_number', 'country', 'sector'];
          const missingFields = requiredFields.filter(field => !body.params.data[field]);
          
          if (missingFields.length > 0) {
            const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
            console.error(errorMsg);
            return { error: errorMsg };
          }
          
          // Only include fields that are in the schema
          // This is a whitelist approach to avoid errors with unexpected fields
          const companyData = {
            name: body.params.data.name,
            country: body.params.data.country,
            sector: body.params.data.sector,
            registration_number: body.params.data.registration_number,
            size: body.params.data.size,
            city: body.params.data.city || null,
            industry: body.params.data.industry || null,
            epr_status: body.params.data.epr_registered ? 'registered' : 'not_registered',
            onboarding_completed: true
          };
          
          // Log the filtered data that will be sent to the database
          console.log('Filtered company data for insert:', companyData);
          
          const { data, error } = await supabase
            .from('companies')
            .insert(companyData)
            .select();
            
          if (error) {
            console.error('Supabase createCompany error:', error);
            // Return a structured error object with clear message and code
            return { 
              error: {
                message: error.message || 'Failed to create company',
                code: error.code,
                details: error.details,
                hint: error.hint
              }
            };
          }
          
          // If we need to track the creator, we could store this relationship in a separate table
          // or add it to the user profile instead
          if (body.params.data.created_by && data && data.length > 0) {
            try {
              // Update the user's profile to link them to this company
              const { error: profileError } = await supabase
                .from('profiles')
                .update({ company_id: data[0].id })
                .eq('id', body.params.data.created_by);
                
              if (profileError) {
                console.warn('Could not update user profile with company ID:', profileError);
              }
            } catch (profileErr) {
              console.warn('Error updating user profile:', profileErr);
            }
          }
          
          console.log('Company created successfully:', data);
          
          // If user ID was provided, update the user's profile with the company ID
          if (body.params.data.created_by && data && data.length > 0) {
            try {
              const { error: profileError } = await supabase
                .from('profiles')
                .update({ company_id: data[0].id })
                .eq('id', body.params.data.created_by);
                
              if (profileError) {
                console.error('Failed to update user profile with company ID:', profileError);
              } else {
                console.log('Updated user profile with company ID');
              }
            } catch (profileUpdateErr) {
              console.error('Exception updating user profile:', profileUpdateErr);
            }
          }
          
          return { data };
        } catch (err) {
          console.error('Exception in createCompany:', err);
          return { 
            error: {
              message: err.message || 'An unexpected error occurred',
              code: 'UNKNOWN_ERROR'
            }
          };
        }
      
      case 'updateCompany':
        return await supabase
          .from('companies')
          .update(body.params.data)
          .eq('id', body.params.id)
          .select();
      
      // Products
      case 'getProducts':
        let query = supabase
          .from('products')
          .select(body.params?.select || '*');
        
        if (body.params?.filters) {
          Object.entries(body.params.filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }
        
        if (body.params?.pagination) {
          const { page, perPage } = body.params.pagination;
          const from = (page - 1) * perPage;
          const to = from + perPage - 1;
          query = query.range(from, to);
        }
        
        if (body.params?.orderBy) {
          query = query.order(body.params.orderBy.column, { 
            ascending: body.params.orderBy.ascending 
          });
        }
        
        return await query;
      
      case 'createProduct':
        return await supabase
          .from('products')
          .insert(body.params.data)
          .select();
      
      case 'updateProduct':
        return await supabase
          .from('products')
          .update(body.params.data)
          .eq('id', body.params.id)
          .select();
      
      case 'deleteProduct':
        return await supabase
          .from('products')
          .delete()
          .eq('id', body.params.id);
      
      // Uploads
      case 'createUpload':
        return await supabase
          .from('uploads')
          .insert(body.params.data)
          .select();
      
      case 'updateUpload':
        return await supabase
          .from('uploads')
          .update(body.params.data)
          .eq('id', body.params.id)
          .select();
      
      case 'getUploads':
        return await supabase
          .from('uploads')
          .select('*')
          .eq('company_id', body.params.companyId)
          .order('created_at', { ascending: false });
      
      // Reports
      case 'getFootprintReports':
        return await supabase
          .from('footprint_reports')
          .select('*')
          .eq('company_id', body.params.companyId)
          .order('report_date', { ascending: false });
      
      case 'createFootprintReport':
        return await supabase
          .from('footprint_reports')
          .insert(body.params.data)
          .select();
      
      // Compliance scores
      case 'getComplianceScores':
        return await supabase
          .from('compliance_scores')
          .select('*')
          .eq('company_id', body.params.companyId)
          .order('created_at', { ascending: false });
      
      // Team management
      case 'getTeamMembers':
        return await supabase
          .from('profiles')
          .select('*')
          .eq('company_id', body.params.companyId);
      
      case 'inviteTeamMember':
        // In a real implementation, this would send an email invitation
        // For now, we'll just create the user with a placeholder password
        if (!adminClient) {
          return { error: 'Service role key is required for admin operations' };
        }
        
        return await adminClient.auth.admin.createUser({
          email: body.params.email,
          password: body.params.tempPassword,
          email_confirm: true,
          user_metadata: {
            company_id: body.params.companyId,
            role: body.params.role
          }
        });
      
      // Storage API methods
      case 'uploadFile':
        // Check if bucket exists, create it if not
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .getBucket(body.params.bucket);
          
        if (bucketError && bucketError.message.includes('not found')) {
          if (!adminClient) {
            return { error: 'Service role key is required for bucket creation' };
          }
          
          await adminClient.storage.createBucket(body.params.bucket, {
            public: body.params.options?.isPublic || false
          });
        }
        
        // Convert base64 content to Buffer if needed
        let fileContent = body.params.fileContent;
        if (typeof fileContent === 'string' && fileContent.startsWith('data:')) {
          // Extract the base64 content
          const base64Content = fileContent.split(',')[1];
          fileContent = Buffer.from(base64Content, 'base64');
        }
        
        // Upload the file
        return await supabase
          .storage
          .from(body.params.bucket)
          .upload(body.params.filePath, fileContent, {
            cacheControl: '3600',
            upsert: true,
            contentType: body.params.options?.contentType || 'application/octet-stream',
            ...body.params.options
          });
      
      case 'getPublicUrl':
        return { 
          data: supabase
            .storage
            .from(body.params.bucket)
            .getPublicUrl(body.params.filePath) 
        };
        
      case 'getSignedUrl':
        return await supabase
          .storage
          .from(body.params.bucket)
          .createSignedUrl(body.params.filePath, body.params.expiresIn || 3600);
          
      case 'listFiles':
        return await supabase
          .storage
          .from(body.params.bucket)
          .list(body.params.folder || '', {
            limit: body.params.limit || 100,
            offset: body.params.offset || 0,
            sortBy: { column: body.params.sortBy || 'name', order: body.params.order || 'asc' }
          });
          
      case 'deleteFile':
        return await supabase
          .storage
          .from(body.params.bucket)
          .remove([body.params.filePath]);
          
      case 'createBucket':
        if (!adminClient) {
          return { error: 'Service role key is required for bucket creation' };
        }
        
        return await adminClient
          .storage
          .createBucket(body.params.bucket, {
            public: body.params.isPublic || false
          });
      
      default:
        return { error: `Unknown action: ${body.action}` };
    }
  } catch (error) {
    return { error: error.message || 'An error occurred while processing your request.' };
  }
});
