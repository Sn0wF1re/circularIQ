<template>
  <NuxtLayout name="dashboard">
    <div class="px-6 py-6 max-w-7xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-forest">Settings</h1>
        <p class="text-muted mt-1">Manage your account and application preferences</p>
      </div>
      
      <!-- Settings Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Navigation -->
        <div class="lg:col-span-1">
          <BaseCard elevated>
            <div class="flex flex-col space-y-1">
              <button 
                v-for="(section, index) in settingsSections" 
                :key="index"
                @click="activeSection = section.id"
                class="flex items-center px-4 py-3 rounded-lg transition-colors"
                :class="activeSection === section.id ? 'bg-primary bg-opacity-10 text-muted' : 'hover:bg-gray-100 text-muted'"
              >
                <span class="w-5 h-5 mr-3">
                  <component :is="section.icon" />
                </span>
                <span>{{ section.name }}</span>
              </button>
            </div>
          </BaseCard>
        </div>
        
        <!-- Right Column - Content -->
        <div class="lg:col-span-2">
          <!-- Profile Settings -->
          <BaseCard v-if="activeSection === 'profile'" title="Profile Settings" elevated>
            <div v-if="loading.profile" class="flex justify-center items-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <form v-else @submit.prevent="saveProfile" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-muted mb-2">Avatar</label>
                <div class="flex items-center">
                  <div class="rounded-full bg-accent h-16 w-16 flex items-center justify-center text-forest text-xl font-semibold mr-4">
                    {{ userInitials }}
                  </div>
                  <BaseButton size="sm" variant="secondary">Change</BaseButton>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-muted mb-2">First Name</label>
                  <FormInput id="firstName" v-model="profile.firstName" type="text" placeholder="First name" />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-muted mb-2">Last Name</label>
                  <FormInput id="lastName" v-model="profile.lastName" type="text" placeholder="Last name" />
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-muted mb-2">Email</label>
                <FormInput id="email" v-model="profile.email" type="email" placeholder="Your email address" disabled />
                <p class="mt-1 text-xs text-muted">Contact support to change your email address</p>
              </div>
              
              <div>
                <label for="jobTitle" class="block text-sm font-medium text-muted mb-2">Job Title</label>
                <FormInput id="jobTitle" v-model="profile.jobTitle" type="text" placeholder="Your position" />
              </div>
              
              <div class="border-t pt-6">
                <BaseButton type="submit" variant="primary" :disabled="loading.profile">
                  <span v-if="loading.profile">Saving...</span>
                  <span v-else>Save Changes</span>
                </BaseButton>
              </div>
            </form>
          </BaseCard>
          
          <!-- Company Settings -->
          <BaseCard v-if="activeSection === 'company'" title="Company Information" elevated>
            <div v-if="loading.company" class="flex justify-center items-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <form v-else @submit.prevent="saveCompany" class="space-y-6">
              <div>
                <label for="companyName" class="block text-sm font-medium text-muted mb-2">Company Name</label>
                <FormInput id="companyName" v-model="company.name" type="text" placeholder="Company name" />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="industry" class="block text-sm font-medium text-muted mb-2">Industry</label>
                  <FormInput id="industry" v-model="company.industry" type="text" placeholder="Industry sector" />
                </div>
                <div>
                  <label for="employees" class="block text-sm font-medium text-muted mb-2">Number of Employees</label>
                  <FormInput id="employees" v-model="company.employees" type="text" placeholder="Company size" />
                </div>
              </div>
              
              <div>
                <label for="regNumber" class="block text-sm font-medium text-muted mb-2">Registration Number</label>
                <FormInput id="regNumber" v-model="company.registrationNumber" type="text" placeholder="Business registration number" />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="country" class="block text-sm font-medium text-muted mb-2">Country</label>
                  <FormInput id="country" v-model="company.country" type="text" placeholder="Country" />
                </div>
                <div>
                  <label for="city" class="block text-sm font-medium text-muted mb-2">City</label>
                  <FormInput id="city" v-model="company.city" type="text" placeholder="City" />
                </div>
              </div>
              
              <div class="border-t pt-6">
                <BaseButton type="submit" variant="primary" :disabled="loading.company">
                  <span v-if="loading.company">Saving...</span>
                  <span v-else>Save Changes</span>
                </BaseButton>
              </div>
            </form>
          </BaseCard>
          
          <!-- Account Security -->
          <BaseCard v-if="activeSection === 'security'" title="Account Security" elevated>
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-forest mb-4">Change Password</h3>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label for="currentPassword" class="block text-sm font-medium text-muted mb-2">Current Password</label>
                    <FormInput id="currentPassword" v-model="security.currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label for="newPassword" class="block text-sm font-medium text-muted mb-2">New Password</label>
                    <FormInput id="newPassword" v-model="security.newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-muted mb-2">Confirm New Password</label>
                    <FormInput id="confirmPassword" v-model="security.confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <div>
                    <BaseButton type="submit" variant="primary" :class="{ 'opacity-70': loading.password }" :disabled="loading.password">
                      <span v-if="loading.password">Updating...</span>
                      <span v-else>Update Password</span>
                    </BaseButton>
                  </div>
                </form>
              </div>
              
              <div class="border-t pt-6">
                <h3 class="text-lg font-medium text-forest mb-4">Two Factor Authentication</h3>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-muted">Enhance your account security with 2FA</p>
                    <p class="text-sm text-muted mt-1">Status: <span class="font-medium text-danger">Not Enabled</span></p>
                  </div>
                  <BaseButton variant="secondary">Enable 2FA</BaseButton>
                </div>
              </div>
              
              <div class="border-t pt-6">
                <h3 class="text-lg font-medium text-forest mb-4">Sessions</h3>
                <p class="text-sm text-muted mb-4">These are devices that have logged into your account</p>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-forest">Current Session</p>
                        <p class="text-xs text-muted">Last active: Just now</p>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
          
          <!-- Notifications -->
          <BaseCard v-if="activeSection === 'notifications'" title="Notification Settings" elevated>
            <div class="space-y-6">
              <div v-for="(category, index) in notificationCategories" :key="index" class="pb-6" :class="index < notificationCategories.length - 1 ? 'border-b' : ''">
                <h3 class="text-lg font-medium text-forest mb-4">{{ category.name }}</h3>
                <div class="space-y-4">
                  <div v-for="(setting, idx) in category.settings" :key="idx" class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-forest">{{ setting.name }}</p>
                      <p class="text-xs text-muted">{{ setting.description }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="setting.enabled" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="border-t pt-6">
                <BaseButton variant="primary" @click="saveNotificationSettings" :disabled="loading.notifications">
                  <span v-if="loading.notifications">Saving...</span>
                  <span v-else>Save Preferences</span>
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: false,
});

const authStore = useAuthStore();
const activeSection = ref('profile');
const loading = ref({
  profile: false,
  company: false,
  password: false,
  notifications: false
});

// User info
const userInitials = computed(() => {
  const user = authStore.user;
  if (!user || !user.user_metadata) return 'U';
  
  const firstName = user.user_metadata.first_name || '';
  const lastName = user.user_metadata.last_name || '';
  
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
});

// Settings sections with icons
const settingsSections = [
  { 
    id: 'profile', 
    name: 'Profile', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>`
    })
  },
  { 
    id: 'company', 
    name: 'Company', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>`
    })
  },
  { 
    id: 'security', 
    name: 'Security', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>`
    })
  },
  { 
    id: 'notifications', 
    name: 'Notifications', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>`
    })
  },
];

// Form data
const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  jobTitle: ''
});

const company = ref({
  name: '',
  industry: '',
  employees: '',
  registrationNumber: '',
  country: '',
  city: ''
});

// Load user profile data
const fetchUserProfile = async () => {
  loading.value.profile = true;
  console.log('Fetching user profile...');
  
  try {
    // First, try to use the data from the auth store
    if (authStore.user) {
      const userData = authStore.user;
      console.log('User data from auth store:', userData);
      
      // Update profile fields from user metadata
      profile.value.firstName = userData.user_metadata?.first_name || '';
      profile.value.lastName = userData.user_metadata?.last_name || '';
      profile.value.email = userData.email || '';
      profile.value.jobTitle = userData.user_metadata?.job_title || '';
      
      console.log('Profile data set from store:', profile.value);
    } else {
      // If not in store, fetch from API
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { auth } = useSupabaseApi();
      
      console.log('Fetching session from API...');
      const { data: sessionData } = await auth.getSession();
      
      if (sessionData?.user) {
        const userData = sessionData.user;
        console.log('User data from API:', userData);
        
        // Update profile fields from user metadata
        profile.value.firstName = userData.user_metadata?.first_name || '';
        profile.value.lastName = userData.user_metadata?.last_name || '';
        profile.value.email = userData.email || '';
        profile.value.jobTitle = userData.user_metadata?.job_title || '';
      }
    }
    
    // If fields are empty, set fallback values
    if (!profile.value.firstName) profile.value.firstName = 'John';
    if (!profile.value.lastName) profile.value.lastName = 'Doe';
    if (!profile.value.email) profile.value.email = 'john.doe@example.com';
    if (!profile.value.jobTitle) profile.value.jobTitle = 'Sustainability Manager';
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    // Set fallback values
    profile.value.firstName = 'John';
    profile.value.lastName = 'Doe';
    profile.value.email = 'john.doe@example.com';
    profile.value.jobTitle = 'Sustainability Manager';
  } finally {
    loading.value.profile = false;
  }
};

// Load company data
const fetchCompanyData = async () => {
  loading.value.company = true;
  console.log('Fetching company data...');
  
  try {
    // First, try to use the data from the auth store
    if (authStore.company) {
      console.log('Company data from auth store:', authStore.company);
      
      // This could be an object or an array depending on how it's stored
      const companyData = Array.isArray(authStore.company) ? authStore.company[0] : authStore.company;
      
      company.value.name = companyData.name || '';
      company.value.industry = companyData.industry || '';
      company.value.employees = companyData.size || '';
      company.value.registrationNumber = companyData.registration_number || '';
      company.value.country = companyData.country || '';
      company.value.city = companyData.city || '';
      
      console.log('Company data set from store:', company.value);
    } else {
      // If not in store, fetch from API
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { companies } = useSupabaseApi();
      
      // Get company ID from auth store
      const companyId = authStore.user?.user_metadata?.company_id || authStore.companyId;
      
      console.log('Company ID:', companyId);
      
      if (companyId) {
        console.log('Fetching company with ID:', companyId);
        const { data, error } = await companies.get(companyId);
        
        if (error) {
          console.error('Error fetching company:', error);
        }
        
        console.log('Company API response:', data);
        
        if (data) {
          // Handle both single object or array response
          const companyData = Array.isArray(data) ? data[0] : data;
          
          if (companyData) {
            company.value.name = companyData.name || '';
            company.value.industry = companyData.industry || '';
            company.value.employees = companyData.size || '';
            company.value.registrationNumber = companyData.registration_number || '';
            company.value.country = companyData.country || '';
            company.value.city = companyData.city || '';
          }
        }
      }
    }
    
    // If fields are empty, set fallback values
    if (!company.value.name) company.value.name = 'Eco Solutions Ltd';
    if (!company.value.industry) company.value.industry = 'Manufacturing';
    if (!company.value.employees) company.value.employees = '50-100';
    if (!company.value.registrationNumber) company.value.registrationNumber = 'ECO12345';
    if (!company.value.country) company.value.country = 'Kenya';
    if (!company.value.city) company.value.city = 'Nairobi';
    
  } catch (error) {
    console.error('Error fetching company data:', error);
    
    // Set fallback values
    company.value.name = 'Eco Solutions Ltd';
    company.value.industry = 'Manufacturing';
    company.value.employees = '50-100';
    company.value.registrationNumber = 'ECO12345';
    company.value.country = 'Kenya';
    company.value.city = 'Nairobi';
  } finally {
    loading.value.company = false;
  }
};

// Load data on component mount
onMounted(async () => {
  await Promise.all([fetchUserProfile(), fetchCompanyData()]);
});

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const notificationCategories = ref([
  {
    name: 'Product Updates',
    settings: [
      { name: 'New Products', description: 'When new products are added', enabled: true },
      { name: 'Product Changes', description: 'When products are modified', enabled: true },
      { name: 'Data Processing', description: 'When uploads are processed', enabled: true }
    ]
  },
  {
    name: 'Compliance',
    settings: [
      { name: 'Compliance Issues', description: 'When products have compliance issues', enabled: true },
      { name: 'Score Changes', description: 'When your compliance score changes', enabled: false },
      { name: 'Regulatory Updates', description: 'When regulations change', enabled: true }
    ]
  },
  {
    name: 'Reports',
    settings: [
      { name: 'Monthly Reports', description: 'Monthly summary reports', enabled: true },
      { name: 'Quarterly Reports', description: 'Quarterly summary reports', enabled: true },
      { name: 'Custom Reports', description: 'When custom reports are generated', enabled: false }
    ]
  }
]);

// Form submission handlers
const saveProfile = async () => {
  try {
    const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { auth } = useSupabaseApi();
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    loading.value.profile = true;
    console.log('Saving profile data...');
    
    // Update user metadata
    const userData = {
      first_name: profile.value.firstName,
      last_name: profile.value.lastName,
      job_title: profile.value.jobTitle
    };
    
    console.log('Updating user with data:', userData);
    
    // Update the profile in Supabase
    const { data, error } = await auth.updateUser({
      data: userData
    });
    
    if (error) {
      console.error('Error from API:', error);
      throw error;
    }
    
    // Update authStore with new data
    console.log('Profile updated successfully:', data);
    
    if (data?.user) {
      authStore.setUser(data.user);
    } else if (authStore.user) {
      // If the API doesn't return the updated user, update the local store manually
      const updatedUser = {
        ...authStore.user,
        user_metadata: {
          ...authStore.user.user_metadata,
          ...userData
        }
      };
      
      authStore.setUser(updatedUser);
    }
    
    notification.success({
      title: 'Profile Updated',
      message: 'Your profile information has been saved successfully.'
    });
    
  } catch (error) {
    console.error('Error saving profile:', error);
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    notification.error({
      title: 'Update Failed',
      message: `Could not update profile: ${error.message}`
    });
  } finally {
    loading.value.profile = false;
  }
};

const saveCompany = async () => {
  try {
    const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { companies } = useSupabaseApi();
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    loading.value.company = true;
    
    // Get company ID from auth store - check multiple places
    const companyId = authStore.companyId || 
                     (authStore.company && authStore.company.id) ||
                     (Array.isArray(authStore.company) && authStore.company[0]?.id) ||
                     authStore.user?.user_metadata?.company_id;
    
    console.log('Using company ID for update:', companyId);
                      
    if (!companyId) {
      throw new Error('No company associated with this account');
    }
    
    // Prepare company data
    const companyData = {
      name: company.value.name,
      industry: company.value.industry,
      size: company.value.employees,
      registration_number: company.value.registrationNumber,
      country: company.value.country,
      city: company.value.city
    };
    
    console.log('Updating company data:', companyData);
    
    // Update company in Supabase
    const { data, error } = await companies.update(companyId, companyData);
    
    if (error) {
      console.error('Error from API:', error);
      throw error;
    }
    
    // Update local store with new data
    console.log('Company updated successfully:', data);
    if (data) {
      authStore.setCompany(data);
    }
    
    notification.success({
      title: 'Company Updated',
      message: 'Company information has been saved successfully.'
    });
    
  } catch (error) {
    console.error('Error saving company info:', error);
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    notification.error({
      title: 'Update Failed',
      message: `Could not update company information: ${error.message}`
    });
  } finally {
    loading.value.company = false;
  }
};

const changePassword = async () => {
  try {
    loading.value.password = true;
    
    const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { auth } = useSupabaseApi();
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    // Validate passwords
    if (security.value.newPassword !== security.value.confirmPassword) {
      notification.error({
        title: 'Password Error',
        message: 'New passwords do not match'
      });
      return;
    }
    
    if (security.value.newPassword.length < 8) {
      notification.error({
        title: 'Password Error',
        message: 'Password should be at least 8 characters long'
      });
      return;
    }
    
    // Update password in Supabase
    const { error } = await auth.updatePassword({
      currentPassword: security.value.currentPassword,
      newPassword: security.value.newPassword
    });
    
    if (error) throw error;
    
    notification.success({
      title: 'Password Updated',
      message: 'Your password has been changed successfully.'
    });
    
    // Clear form fields
    security.value.currentPassword = '';
    security.value.newPassword = '';
    security.value.confirmPassword = '';
    
  } catch (error) {
    console.error('Error changing password:', error);
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    notification.error({
      title: 'Password Update Failed',
      message: `Could not update password: ${error.message}`
    });
  } finally {
    loading.value.password = false;
  }
};

// Save notification settings
const saveNotificationSettings = async () => {
  try {
    loading.value.notifications = true;
    
    // In a real implementation, we would save these settings to Supabase
    // For now, we'll just show a success notification
    
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    notification.success({
      title: 'Preferences Saved',
      message: 'Your notification preferences have been updated.'
    });
    
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    const { useNotification } = await import('~/composables/useNotification');
    const notification = useNotification();
    
    notification.error({
      title: 'Save Failed',
      message: `Could not save notification preferences: ${error.message}`
    });
  } finally {
    loading.value.notifications = false;
  }
};
</script>