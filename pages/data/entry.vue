<!-- filepath: /home/clinton/repos/circularIQ/pages/data/entry.vue -->
<template>
  <NuxtLayout name="dashboard">
    <div>
      <div class="mb-6">
      <div class="flex items-center mb-2">
        <BaseButton 
          variant="ghost" 
          icon 
          size="sm"
          class="mr-2"
          @click="router.push('/data')"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </template>
        </BaseButton>
        <h1 class="text-2xl font-bold text-forest">{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h1>
        </div>
        <p class="text-muted">{{ isEdit ? 'Update product information and plastic usage data' : 'Enter product information and plastic usage data' }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Product Information -->
        <div class="lg:col-span-2">
          <BaseCard title="Product Information" elevated>
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  v-model="form.name"
                  label="Product Name"
                  placeholder="e.g. Water Bottle 500ml"
                  required
                  :error="errors.name"
                  @blur="validateField('name')"
                />

                <FormInput
                  v-model="form.sku"
                  label="SKU / Product Code"
                  placeholder="e.g. WB-500-PET"
                  hint="Internal product identifier"
                  @blur="validateField('sku')"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-muted mb-1">
                    Product Type <span class="text-danger">*</span>
                  </label>
                  <select 
                    v-model="form.product_type"
                    class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    required
                    @change="validateField('product_type')"
                  >
                    <option value="" disabled>Select Product Type</option>
                    <option value="packaging">Packaging</option>
                    <option value="container">Container</option>
                    <option value="bottle">Bottle</option>
                    <option value="wrapper">Wrapper</option>
                    <option value="utensil">Utensil</option>
                    <option value="other">Other</option>
                  </select>
                  <p v-if="errors.product_type" class="mt-1 text-danger text-xs">{{ errors.product_type }}</p>
                </div>

                <FormInput
                  v-model="form.units_per_year"
                  type="number"
                  label="Annual Units"
                  placeholder="e.g. 10000"
                  hint="Estimated annual production/import"
                  @blur="validateField('units_per_year')"
                />
              </div>

              <!-- Materials Information -->
              <div class="pt-4 border-t">
                <h3 class="font-medium text-lg text-forest mb-4">Materials Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-muted mb-1">
                      Material Type <span class="text-danger">*</span>
                    </label>
                    <select 
                      v-model="form.material_type"
                      class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      required
                      @change="validateField('material_type')"
                    >
                      <option value="" disabled>Select Material Type</option>
                      <option value="PET">PET (Polyethylene Terephthalate)</option>
                      <option value="HDPE">HDPE (High-Density Polyethylene)</option>
                      <option value="PVC">PVC (Polyvinyl Chloride)</option>
                      <option value="LDPE">LDPE (Low-Density Polyethylene)</option>
                      <option value="PP">PP (Polypropylene)</option>
                      <option value="PS">PS (Polystyrene)</option>
                      <option value="Other">Other Plastic</option>
                    </select>
                    <p v-if="errors.material_type" class="mt-1 text-danger text-xs">{{ errors.material_type }}</p>
                  </div>

                  <FormInput
                    v-model.number="form.weight_grams"
                    type="number"
                    step="0.01"
                    label="Weight (grams)"
                    placeholder="e.g. 25"
                    required
                    :error="errors.weight_grams"
                    @input="calculateTotalWeight"
                    @blur="validateField('weight_grams')"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-muted mb-1">
                      Recyclability % <span class="text-danger">*</span>
                    </label>
                    <div class="flex items-center">
                      <input 
                        type="range" 
                        v-model.number="form.recyclability_percentage" 
                        min="0" 
                        max="100" 
                        step="5"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span class="ml-2 w-10 text-center">{{ form.recyclability_percentage }}%</span>
                    </div>
                    <p v-if="errors.recyclability_percentage" class="mt-1 text-danger text-xs">{{ errors.recyclability_percentage }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-muted mb-1">
                      Recycled Content %
                    </label>
                    <div class="flex items-center">
                      <input 
                        type="range" 
                        v-model.number="form.recycled_content" 
                        min="0" 
                        max="100" 
                        step="5"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span class="ml-2 w-10 text-center">{{ form.recycled_content }}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Information -->
              <div class="pt-4 border-t">
                <h3 class="font-medium text-lg text-forest mb-4">Additional Information</h3>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-muted mb-1">
                    Description
                  </label>
                  <textarea 
                    v-model="form.description"
                    class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    rows="3"
                    placeholder="Additional details about this product..."
                  ></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-muted mb-1">
                      Is Biodegradable?
                    </label>
                    <div class="flex items-center space-x-4 mt-1">
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="form.is_biodegradable" :value="true" class="accent-primary" />
                        <span class="ml-2">Yes</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="form.is_biodegradable" :value="false" class="accent-primary" />
                        <span class="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-muted mb-1">
                      Is Reusable?
                    </label>
                    <div class="flex items-center space-x-4 mt-1">
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="form.is_reusable" :value="true" class="accent-primary" />
                        <span class="ml-2">Yes</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input type="radio" v-model="form.is_reusable" :value="false" class="accent-primary" />
                        <span class="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-4 border-t">
                <BaseButton 
                  type="button" 
                  variant="outline" 
                  @click="navigateBack"
                >
                  Cancel
                </BaseButton>
                <BaseButton 
                  type="submit" 
                  variant="primary"
                  :loading="loading"
                >
                  {{ isEdit ? 'Update Product' : 'Save Product' }}
                </BaseButton>
              </div>
            </form>
          </BaseCard>
        </div>
        
        <!-- Calculation Preview -->
        <div>
          <BaseCard title="Calculation Preview" elevated>
            <div class="space-y-6">
              <div>
                <h4 class="text-sm uppercase font-medium text-muted mb-2">Annual Plastic Usage</h4>
                <p class="text-3xl font-bold text-forest">
                  {{ totalWeight.toFixed(2) }} kg
                </p>
                <p class="text-muted text-sm mt-1">
                  Based on {{ form.weight_grams || 0 }}g per unit × {{ form.units_per_year || 0 }} units/year
                </p>
              </div>
              
              <div>
                <h4 class="text-sm uppercase font-medium text-muted mb-2">Recyclability Score</h4>
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div 
                      class="h-2.5 rounded-full" 
                      :class="getRecyclabilityColorClass(form.recyclability_percentage)"
                      :style="`width: ${form.recyclability_percentage}%`" 
                    ></div>
                  </div>
                  <span class="text-sm font-medium">{{ form.recyclability_percentage }}%</span>
                </div>
                <p class="text-muted text-sm mt-1">
                  {{ getRecyclabilityLabel(form.recyclability_percentage) }}
                </p>
              </div>

              <div>
                <h4 class="text-sm uppercase font-medium text-muted mb-2">Compliance Status</h4>
                <div class="flex items-center">
                  <StatusDot :status="getComplianceStatus(form)" />
                  <span class="ml-2">{{ getComplianceLabel(form) }}</span>
                </div>
                <ul class="text-sm mt-2 space-y-1 text-muted">
                  <li v-for="(issue, i) in complianceIssues" :key="i" class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-warning mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{{ issue }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm uppercase font-medium text-muted mb-2">Estimated CO2 Impact</h4>
                <p class="text-xl font-semibold text-forest">
                  {{ calculateCO2Impact().toFixed(2) }} kg CO2e
                </p>
                <p class="text-muted text-sm mt-1">
                  Based on material type and weight
                </p>
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
import { useRoute, useRouter } from 'vue-router';
import { usePlasticDataStore } from '~/stores/plasticData';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const plasticDataStore = usePlasticDataStore();
const authStore = useAuthStore();

// Local state
const loading = ref(false);
const errors = ref({});
const totalWeight = ref(0);

// Form data with default values
const form = ref({
  name: '',
  sku: '',
  product_type: '',
  material_type: '',
  weight_grams: null,
  units_per_year: null,
  recyclability_percentage: 50,
  recycled_content: 0,
  description: '',
  is_biodegradable: false,
  is_reusable: false,
  company_id: authStore.companyId
});

// Check if we're in edit mode
const isEdit = computed(() => !!route.query.id);

// Computed compliance issues
const complianceIssues = computed(() => {
  const issues = [];
  
  if (!form.value.recyclability_percentage || form.value.recyclability_percentage < 30) {
    issues.push('Low recyclability (below 30%) may not meet EPR requirements');
  }
  
  if (form.value.material_type === 'PVC') {
    issues.push('PVC is restricted under some regulations');
  }
  
  if (form.value.material_type === 'PS') {
    issues.push('Polystyrene is being phased out in many regions');
  }
  
  if (!form.value.recycled_content) {
    issues.push('Products should include some recycled content');
  }
  
  return issues;
});

// Fetch product data if in edit mode
onMounted(async () => {
  if (isEdit.value) {
    loading.value = true;
    try {
      const productId = route.query.id;
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { products } = useSupabaseApi();
      
      const response = await products.get(productId);
      
      if (response.data && response.data.length > 0) {
        Object.assign(form.value, response.data[0]);
        calculateTotalWeight();
      } else {
        // Handle product not found
        router.push('/data');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loading.value = false;
    }
  }
});

// Calculate total weight in kg
function calculateTotalWeight() {
  const weight = form.value.weight_grams || 0;
  const units = form.value.units_per_year || 0;
  totalWeight.value = (weight * units) / 1000; // Convert to kg
}

// Validate form fields
function validateField(field) {
  errors.value[field] = null;
  
  switch (field) {
    case 'name':
      if (!form.value.name) {
        errors.value.name = 'Product name is required';
      } else if (form.value.name.length < 3) {
        errors.value.name = 'Product name must be at least 3 characters';
      } else if (form.value.name.length > 100) {
        errors.value.name = 'Product name cannot exceed 100 characters';
      }
      break;
    case 'sku':
      if (form.value.sku && form.value.sku.length > 50) {
        errors.value.sku = 'SKU cannot exceed 50 characters';
      }
      break;
    case 'product_type':
      if (!form.value.product_type) {
        errors.value.product_type = 'Product type is required';
      }
      break;
    case 'material_type':
      if (!form.value.material_type) {
        errors.value.material_type = 'Material type is required';
      }
      break;
    case 'weight_grams':
      if (!form.value.weight_grams && form.value.weight_grams !== 0) {
        errors.value.weight_grams = 'Weight is required';
      } else if (form.value.weight_grams <= 0) {
        errors.value.weight_grams = 'Weight must be greater than 0';
      } else if (form.value.weight_grams > 100000) {
        errors.value.weight_grams = 'Weight cannot exceed 100,000 grams';
      }
      break;
    case 'units_per_year':
      if (form.value.units_per_year) {
        if (form.value.units_per_year < 0) {
          errors.value.units_per_year = 'Annual units cannot be negative';
        } else if (form.value.units_per_year > 1000000000) {
          errors.value.units_per_year = 'Annual units cannot exceed 1 billion';
        }
      }
      break;
    case 'recyclability_percentage':
      if (form.value.recyclability_percentage < 0 || form.value.recyclability_percentage > 100) {
        errors.value.recyclability_percentage = 'Recyclability must be between 0-100%';
      }
      break;
  }
}

// Validate entire form
function validateForm() {
  // Validate required fields
  validateField('name');
  validateField('product_type');
  validateField('material_type');
  validateField('weight_grams');
  
  // Validate optional fields if they have values
  if (form.value.sku) validateField('sku');
  if (form.value.units_per_year) validateField('units_per_year');
  validateField('recyclability_percentage');
  
  // Check if there are any errors
  const hasErrors = Object.values(errors.value).some(error => error);
  
  // If there are errors, scroll to the first error
  if (hasErrors) {
    // Use setTimeout to wait for the DOM to update with error messages
    setTimeout(() => {
      const firstErrorEl = document.querySelector('.text-danger');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
  
  return !hasErrors;
}  // Submit form handler
async function submitForm() {
  if (!validateForm()) {
    // Show validation error notification
    const { useNotification } = await import('~/composables/useNotification');
    const { error } = useNotification();
    error('Validation Error', 'Please fix the errors in the form before submitting.');
    return;
  }
  
  loading.value = true;
  
  try {
    let result;
    
    if (isEdit.value) {
      result = await plasticDataStore.updateProduct(route.query.id, form.value);
    } else {
      result = await plasticDataStore.createProduct(form.value);
    }
    
    // Import notification composable
    const { useNotification } = await import('~/composables/useNotification');
    const { success, error } = useNotification();
    
    // Show appropriate notification based on result
    if (result.success) {
      success(
        isEdit.value ? 'Product Updated' : 'Product Added',
        isEdit.value 
          ? `Product "${form.value.name}" has been successfully updated.` 
          : `Product "${form.value.name}" has been successfully added.`
      );
      // Navigate back to data list
      router.push('/data');
    } else {
      error('Operation Failed', result.message || 'An unexpected error occurred.');
    }
  } catch (e) {
    console.error('Error saving product:', e);
    
    // Show error notification
    const { useNotification } = await import('~/composables/useNotification');
    const { error } = useNotification();
    error(
      'System Error', 
      'An unexpected error occurred while saving the product. Please try again later.'
    );
  } finally {
    loading.value = false;
  }
}

// Navigate back to data list
function navigateBack() {
  router.push('/data');
}

// Helper function to get recyclability color class
function getRecyclabilityColorClass(percentage) {
  if (percentage >= 70) return 'bg-success';
  if (percentage >= 30) return 'bg-warning';
  return 'bg-danger';
}

// Helper function to get recyclability label
function getRecyclabilityLabel(percentage) {
  if (percentage >= 70) return 'High - Compliant with most regulations';
  if (percentage >= 30) return 'Medium - Acceptable but improvements needed';
  return 'Low - Non-compliant with most EPR regulations';
}

// Helper function to get compliance status
function getComplianceStatus(formData) {
  if (
    (formData.recyclability_percentage >= 70 && formData.recycled_content > 0) ||
    formData.is_biodegradable
  ) {
    return 'success';
  }
  
  if (
    formData.recyclability_percentage >= 30 || 
    formData.recycled_content >= 20
  ) {
    return 'warning';
  }
  
  return 'danger';
}

// Helper function to get compliance label
function getComplianceLabel(formData) {
  if (getComplianceStatus(formData) === 'success') return 'Compliant';
  if (getComplianceStatus(formData) === 'warning') return 'Partially Compliant';
  return 'Non-Compliant';
}

// Helper function to calculate estimated CO2 impact
function calculateCO2Impact() {
  // Basic CO2 impact calculation based on material type and weight
  // These are simplified conversion factors
  const CO2FactorsByMaterial = {
    'PET': 2.5,
    'HDPE': 1.8,
    'PVC': 3.1,
    'LDPE': 2.0,
    'PP': 1.9,
    'PS': 3.5,
    'Other': 2.7
  };
  
  const factor = CO2FactorsByMaterial[form.value.material_type] || 2.7;
  return (form.value.weight_grams || 0) * (form.value.units_per_year || 0) * factor / 1000000;
}
</script>

<style scoped>
/* Custom styles for range inputs */
input[type="range"]::-webkit-slider-thumb {
  background: #28A745;
}

input[type="range"]::-moz-range-thumb {
  background: #28A745;
}

input[type="range"]::-ms-thumb {
  background: #28A745;
}
</style>
