<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 sm:px-8 py-12">
      <!-- Header with Logo -->
      <div class="mb-8 text-center">
        <div class="flex justify-center mb-4">
          <img src="/logo.png" alt="CircularIQ Logo" class="h-12" />
        </div>
        <h1 class="text-3xl font-bold text-forest">Welcome to CircularIQ!</h1>
        <p class="text-muted mt-2">Let's set up your account and get you started on your sustainability journey.</p>
      </div>
      
      <!-- Progress Bar -->
      <div class="max-w-5xl mx-auto mb-8">
        <div class="relative">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-10">
            <div 
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-muted">Step {{ currentStep }} of {{ totalSteps }}</span>
            <span class="text-xs text-muted">{{ stepProgress }}</span>
          </div>
        </div>
      </div>
      
      <!-- Onboarding Content -->
      <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Step 1: Company Information -->
        <div v-if="currentStep === 1" class="p-8">
          <h2 class="text-2xl font-semibold text-forest mb-6">Company Information</h2>
          
          <form @submit.prevent="goToNextStep" class="space-y-6">
            <!-- Company Name -->
            <FormInput
              v-model="company.name"
              label="Company Name"
              :error="errors.name"
              required
            />
            
            <!-- Business Registration Number -->
            <FormInput
              v-model="company.registration_number"
              label="Business Registration Number"
              :error="errors.registration_number"
              required
            />
            
            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Country <span class="text-danger">*</span>
              </label>
              <select
                v-model="company.country"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select Country</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.country" class="mt-1 text-sm text-danger">
                {{ errors.country }}
              </p>
            </div>
            
            <!-- Industry Sector -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Industry Sector <span class="text-danger">*</span>
              </label>
              <select
                v-model="company.sector"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select Sector</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Packaging">Packaging</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.sector" class="mt-1 text-sm text-danger">
                {{ errors.sector }}
              </p>
            </div>
            
            <!-- Company Size -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Company Size <span class="text-danger">*</span>
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  v-for="size in companySizes" 
                  :key="size.value" 
                  class="cursor-pointer"
                  @click="company.size = size.value"
                >
                  <div 
                    class="border rounded-lg p-4 text-center transition-all h-full flex flex-col justify-center"
                    :class="company.size === size.value ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary'"
                  >
                    <div class="text-sm font-medium">{{ size.label }}</div>
                    <div
                      class="text-xs mt-1"
                      :class="company.size===size.value ? 'text-surface' : 'text-muted'"
                    >
                    {{ size.description }}
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="errors.size" class="mt-1 text-sm text-danger">
                {{ errors.size }}
              </p>
            </div>
            
            <div class="flex justify-end pt-4">
              <BaseButton type="submit" variant="primary">
                Next Step
              </BaseButton>
            </div>
          </form>
        </div>
        
        <!-- Step 2: Regulations and Compliance -->
        <div v-if="currentStep === 2" class="p-8">
          <h2 class="text-2xl font-semibold text-forest mb-6">Regulatory Framework</h2>
          
          <form @submit.prevent="goToNextStep" class="space-y-6">
            <!-- EPR Program Status -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Are you registered with an EPR scheme? <span class="text-danger">*</span>
              </label>
              <div class="mt-2 space-y-4">
                <div class="flex items-center">
                  <input
                    id="epr-yes"
                    v-model="company.epr_registered"
                    type="radio"
                    name="epr_registered"
                    :value="true"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label for="epr-yes" class="ml-3">
                    <span class="block text-sm font-medium text-gray-700">Yes</span>
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="epr-no"
                    v-model="company.epr_registered"
                    type="radio"
                    name="epr_registered"
                    :value="false"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label for="epr-no" class="ml-3">
                    <span class="block text-sm font-medium text-gray-700">No</span>
                  </label>
                </div>
              </div>
              <p v-if="errors.epr_registered" class="mt-1 text-sm text-danger">
                {{ errors.epr_registered }}
              </p>
            </div>
            
            <!-- EPR Organization (conditional) -->
            <div v-if="company.epr_registered">
              <FormInput
                v-model="company.epr_organization"
                label="EPR Organization"
                placeholder="e.g. KEPRO, PETCO, etc."
                :error="errors.epr_organization"
                required
              />
            </div>
            
            <!-- Regulatory Priorities -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Which regulatory areas are most important to your business? <span class="text-danger">*</span>
              </label>
              <p class="text-xs text-muted mb-2">Select all that apply</p>
              <div class="space-y-2">
                <div v-for="priority in regulatoryPriorities" :key="priority.value" class="flex items-center">
                  <input
                    :id="`priority-${priority.value}`"
                    v-model="company.regulatory_priorities"
                    type="checkbox"
                    :value="priority.value"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label :for="`priority-${priority.value}`" class="ml-3 block text-sm text-gray-700">
                    {{ priority.label }}
                  </label>
                </div>
              </div>
              <p v-if="errors.regulatory_priorities" class="mt-1 text-sm text-danger">
                {{ errors.regulatory_priorities }}
              </p>
            </div>
            
            <!-- Sustainability Goals -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                What are your primary sustainability goals? <span class="text-danger">*</span>
              </label>
              <p class="text-xs text-muted mb-2">Select up to 3</p>
              <div class="space-y-2">
                <div v-for="goal in sustainabilityGoals" :key="goal.value" class="flex items-center">
                  <input
                    :id="`goal-${goal.value}`"
                    v-model="company.sustainability_goals"
                    type="checkbox"
                    :value="goal.value"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    :disabled="company.sustainability_goals.length >= 3 && !company.sustainability_goals.includes(goal.value)"
                  />
                  <label :for="`goal-${goal.value}`" class="ml-3 block text-sm text-gray-700">
                    {{ goal.label }}
                  </label>
                </div>
              </div>
              <p v-if="errors.sustainability_goals" class="mt-1 text-sm text-danger">
                {{ errors.sustainability_goals }}
              </p>
            </div>
            
            <div class="flex justify-between pt-4">
              <BaseButton type="button" variant="outline" @click="goToPreviousStep">
                Back
              </BaseButton>
              <BaseButton type="submit" variant="primary">
                Next Step
              </BaseButton>
            </div>
          </form>
        </div>
        
        <!-- Step 3: Data Sources and Upload Format -->
        <div v-if="currentStep === 3" class="p-8">
          <h2 class="text-2xl font-semibold text-forest mb-6">Data Collection Preferences</h2>
          
          <form @submit.prevent="goToNextStep" class="space-y-6">
            <!-- Data Collection Method -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                How do you prefer to input your product data? <span class="text-danger">*</span>
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div 
                  v-for="method in dataInputMethods" 
                  :key="method.value" 
                  class="cursor-pointer"
                  @click="company.data_input_method = method.value"
                >
                  <div 
                    class="border rounded-lg p-4 text-center h-full transition-all flex flex-col justify-center"
                    :class="company.data_input_method === method.value ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary'"
                  >
                    <div class="text-sm font-medium">{{ method.label }}</div>
                    <div 
                      class="text-xs text-muted mt-1"
                      :class="company.data_input_method === method.value ? 'text-surface' : 'text-muted'"
                    >
                    {{ method.description }}
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="errors.data_input_method" class="mt-1 text-sm text-danger">
                {{ errors.data_input_method }}
              </p>
            </div>
            
            <!-- Product Data Availability -->
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                What product information do you currently track? <span class="text-danger">*</span>
              </label>
              <p class="text-xs text-muted mb-2">Select all that apply</p>
              <div class="space-y-2">
                <div v-for="dataType in productDataTypes" :key="dataType.value" class="flex items-center">
                  <input
                    :id="`data-${dataType.value}`"
                    v-model="company.product_data_types"
                    type="checkbox"
                    :value="dataType.value"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label :for="`data-${dataType.value}`" class="ml-3 block text-sm text-gray-700">
                    {{ dataType.label }}
                  </label>
                </div>
              </div>
              <p v-if="errors.product_data_types" class="mt-1 text-sm text-danger">
                {{ errors.product_data_types }}
              </p>
            </div>
            
            <!-- Product Inventory Size -->
            <FormInput
              v-model.number="company.product_count"
              type="number"
              label="Approximately how many products/SKUs do you have?"
              :error="errors.product_count"
              required
            />
            
            <div class="flex justify-between pt-4">
              <BaseButton type="button" variant="outline" @click="goToPreviousStep">
                Back
              </BaseButton>
              <BaseButton type="submit" variant="primary">
                Next Step
              </BaseButton>
            </div>
          </form>
        </div>
        
        <!-- Step 4: Review and Complete -->
        <div v-if="currentStep === 4" class="p-8">
          <h2 class="text-2xl font-semibold text-forest mb-6">Review & Complete</h2>
          
          <div class="space-y-6">
            <!-- Company Information Summary -->
            <div class="bg-background rounded-lg p-4">
              <h3 class="font-medium text-lg text-forest mb-2">Company Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p class="text-muted">Company Name</p>
                  <p class="font-medium">{{ company.name }}</p>
                </div>
                <div>
                  <p class="text-muted">Registration Number</p>
                  <p class="font-medium">{{ company.registration_number }}</p>
                </div>
                <div>
                  <p class="text-muted">Country</p>
                  <p class="font-medium">{{ company.country }}</p>
                </div>
                <div>
                  <p class="text-muted">Industry Sector</p>
                  <p class="font-medium">{{ company.sector }}</p>
                </div>
                <div>
                  <p class="text-muted">Company Size</p>
                  <p class="font-medium">{{ getCompanySizeLabel(company.size) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Regulatory Information Summary -->
            <div class="bg-background rounded-lg p-4">
              <h3 class="font-medium text-lg text-forest mb-2">Regulatory Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p class="text-muted">EPR Registered</p>
                  <p class="font-medium">{{ company.epr_registered ? 'Yes' : 'No' }}</p>
                </div>
                <div v-if="company.epr_registered">
                  <p class="text-muted">EPR Organization</p>
                  <p class="font-medium">{{ company.epr_organization }}</p>
                </div>
                <div class="md:col-span-3">
                  <p class="text-muted">Regulatory Priorities</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <Badge 
                      v-for="priority in company.regulatory_priorities" 
                      :key="priority" 
                      variant="secondary"
                    >
                      {{ getRegulatoryPriorityLabel(priority) }}
                    </Badge>
                  </div>
                </div>
                <div class="md:col-span-3">
                  <p class="text-muted">Sustainability Goals</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <Badge 
                      v-for="goal in company.sustainability_goals" 
                      :key="goal" 
                      variant="secondary"
                    >
                      {{ getSustainabilityGoalLabel(goal) }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Data Collection Summary -->
            <div class="bg-background rounded-lg p-4">
              <h3 class="font-medium text-lg text-forest mb-2">Data Collection</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p class="text-muted">Preferred Input Method</p>
                  <p class="font-medium">{{ getDataInputMethodLabel(company.data_input_method) }}</p>
                </div>
                <div>
                  <p class="text-muted">Product Count</p>
                  <p class="font-medium">{{ company.product_count }}</p>
                </div>
                <div class="md:col-span-3">
                  <p class="text-muted">Product Data Types</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <Badge 
                      v-for="dataType in company.product_data_types" 
                      :key="dataType" 
                      variant="outline"
                    >
                      {{ getProductDataTypeLabel(dataType) }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Terms and Conditions -->
            <div class="mt-6">
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
            </div>
            
            <div class="flex justify-between pt-4">
              <BaseButton type="button" variant="outline" @click="goToPreviousStep">
                Back
              </BaseButton>
              <BaseButton type="button" variant="primary" :disabled="!acceptTerms || loading" :loading="loading" @click="completeOnboarding">
                Complete Setup
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Import notification directly at the component level
import { useNotification } from '~/composables/useNotification';

// Setup notifications - will use the fallback if provider is not available
let notification;
try {
  notification = useNotification();
} catch (error) {
  console.warn('Failed to initialize notification system:', error);
  // Create a basic notification object as fallback
  notification = {
    success: (opts) => alert(opts.message || 'Success!'),
    error: (opts) => alert(opts.message || 'An error occurred'),
    info: (opts) => console.log(opts.message),
    warning: (opts) => console.warn(opts.message)
  };
}

// Set page metadata
useHead({
  title: 'Onboarding - CircularIQ',
  meta: [
    { name: 'description', content: 'Complete your CircularIQ account setup to start managing your sustainability data.' }
  ]
});

const router = useRouter();
const authStore = useAuthStore();

// Step management
const currentStep = ref(1);
const totalSteps = 4;
const loading = ref(false);
const acceptTerms = ref(false);

// Steps progress text
const stepProgress = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Company Information';
    case 2: return 'Regulatory Framework';
    case 3: return 'Data Collection';
    case 4: return 'Review & Complete';
    default: return '';
  }
});

// Company data model
const company = ref({
  name: '',
  registration_number: '',
  country: '',
  sector: '',
  size: '',
  epr_registered: null,
  epr_organization: '',
  regulatory_priorities: [],
  sustainability_goals: [],
  data_input_method: '',
  product_data_types: [],
  product_count: null,
  onboarding_completed: false
});

// Form validation errors
const errors = ref({});

// Step navigation
const goToNextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
  }
};

const goToPreviousStep = () => {
  currentStep.value--;
};

// Validate the current step
const validateCurrentStep = () => {
  errors.value = {};
  let isValid = true;
  
  if (currentStep.value === 1) {
    if (!company.value.name.trim()) {
      errors.value.name = 'Company name is required';
      isValid = false;
    }
    if (!company.value.registration_number.trim()) {
      errors.value.registration_number = 'Registration number is required';
      isValid = false;
    }
    if (!company.value.country) {
      errors.value.country = 'Country is required';
      isValid = false;
    }
    if (!company.value.sector) {
      errors.value.sector = 'Industry sector is required';
      isValid = false;
    }
    if (!company.value.size) {
      errors.value.size = 'Company size is required';
      isValid = false;
    }
  } 
  else if (currentStep.value === 2) {
    if (company.value.epr_registered === null) {
      errors.value.epr_registered = 'Please select an option';
      isValid = false;
    }
    if (company.value.epr_registered && !company.value.epr_organization.trim()) {
      errors.value.epr_organization = 'EPR organization is required';
      isValid = false;
    }
    if (!company.value.regulatory_priorities.length) {
      errors.value.regulatory_priorities = 'Please select at least one regulatory priority';
      isValid = false;
    }
    if (!company.value.sustainability_goals.length) {
      errors.value.sustainability_goals = 'Please select at least one sustainability goal';
      isValid = false;
    }
  } 
  else if (currentStep.value === 3) {
    if (!company.value.data_input_method) {
      errors.value.data_input_method = 'Please select a data input method';
      isValid = false;
    }
    if (!company.value.product_data_types.length) {
      errors.value.product_data_types = 'Please select at least one product data type';
      isValid = false;
    }
    if (!company.value.product_count) {
      errors.value.product_count = 'Product count is required';
      isValid = false;
    }
  }
  
  return isValid;
};

// Complete the onboarding process
const completeOnboarding = async () => {
  if (!acceptTerms.value) {
    errors.value.terms = 'You must accept the Terms of Service and Privacy Policy';
    return;
  }
  
  loading.value = true;
  
  try {
    // Create company data with current user as owner
    const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { companies } = useSupabaseApi();
    
    const companyData = {
      ...company.value,
      onboarding_completed: true,
      created_by: authStore.user?.id // This field will be removed server-side, but used to link user profile
    };
    
    console.log('Submitting company data:', companyData);
    
    const { data, error } = await companies.create(companyData);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Update user metadata to link them to this company
      authStore.setCompanyData(data[0]);
      
      // Use our pre-initialized notification object which has a fallback
      notification.success({
        title: 'Setup Complete!',
        message: 'Your company account has been created successfully.'
      });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      throw new Error('Failed to create company - no data returned');
    }
  } catch (error) {
    console.error('Error completing onboarding:', error);
    
    // Format the error message
    let errorMessage = 'Unknown error occurred';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'object') {
      errorMessage = JSON.stringify(error);
    }
    
    // Use our pre-initialized notification object which has a fallback
    notification.error({
      title: 'Setup Failed',
      message: `Unable to complete setup: ${errorMessage}`
    });
    
    // Scroll to top to ensure user sees any error messages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    loading.value = false;
  }
};

// Helper functions to get labels from values
const getCompanySizeLabel = (value) => {
  const size = companySizes.find(s => s.value === value);
  return size ? size.label : value;
};

const getRegulatoryPriorityLabel = (value) => {
  const priority = regulatoryPriorities.find(p => p.value === value);
  return priority ? priority.label : value;
};

const getSustainabilityGoalLabel = (value) => {
  const goal = sustainabilityGoals.find(g => g.value === value);
  return goal ? goal.label : value;
};

const getDataInputMethodLabel = (value) => {
  const method = dataInputMethods.find(m => m.value === value);
  return method ? method.label : value;
};

const getProductDataTypeLabel = (value) => {
  const dataType = productDataTypes.find(d => d.value === value);
  return dataType ? dataType.label : value;
};

// Form options
const companySizes = [
  { value: 'small', label: 'Small', description: 'Less than 50 employees' },
  { value: 'medium', label: 'Medium', description: '50-250 employees' },
  { value: 'large', label: 'Large', description: 'More than 250 employees' }
];

const regulatoryPriorities = [
  { value: 'epr', label: 'Extended Producer Responsibility (EPR)' },
  { value: 'packaging', label: 'Packaging Regulations' },
  { value: 'plastic_ban', label: 'Plastic Ban Compliance' },
  { value: 'emissions', label: 'Carbon Emissions' },
  { value: 'water', label: 'Water Usage' },
  { value: 'waste', label: 'Waste Management' }
];

const sustainabilityGoals = [
  { value: 'reduce_plastic', label: 'Reduce Plastic Usage' },
  { value: 'increase_recycled', label: 'Increase Recycled Content' },
  { value: 'compliance', label: 'Regulatory Compliance' },
  { value: 'carbon_neutral', label: 'Carbon Neutrality' },
  { value: 'circular_economy', label: 'Circular Economy Transition' },
  { value: 'eco_design', label: 'Eco-friendly Product Design' },
  { value: 'supply_chain', label: 'Sustainable Supply Chain' }
];

const dataInputMethods = [
  { value: 'manual', label: 'Manual Entry', description: 'Enter product data individually through forms' },
  { value: 'csv', label: 'CSV Upload', description: 'Bulk import data using spreadsheet templates' },
  { value: 'mixed', label: 'Combined', description: 'Use both manual entry and bulk uploads' }
];

const productDataTypes = [
  { value: 'weight', label: 'Product Weight' },
  { value: 'material', label: 'Material Type' },
  { value: 'recyclability', label: 'Recyclability Percentage' },
  { value: 'recycled_content', label: 'Recycled Content Percentage' },
  { value: 'volume', label: 'Production Volume' },
  { value: 'dimensions', label: 'Product Dimensions' },
  { value: 'suppliers', label: 'Supplier Information' }
];
</script>
