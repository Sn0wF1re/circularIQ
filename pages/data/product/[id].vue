<!-- filepath: /home/clinton/repos/circularIQ/pages/data/product/[id].vue -->
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
            @click="navigateTo('/data')"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </template>
          </BaseButton>
          <h1 class="text-2xl font-bold text-forest">Product Details</h1>
        </div>
        <p class="text-muted">View and analyze detailed product information</p>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="loader"></div>
      </div>

      <div v-else-if="!product" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-forest">Product Not Found</h3>
        <p class="text-muted mt-1 mb-4">The requested product could not be found</p>
        <BaseButton variant="primary" @click="navigateTo('/data')">Back to Products</BaseButton>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Product Overview -->
        <div>
          <BaseCard elevated>
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-xl font-bold text-forest">{{ product.name }}</h2>
                <p v-if="product.sku" class="text-muted text-sm">SKU: {{ product.sku }}</p>
              </div>
              <div class="flex space-x-2">
                <BaseButton 
                  variant="ghost" 
                  icon 
                  size="sm"
                  @click="navigateTo(`/data/entry?id=${product.id}`)"
                >
                  <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </template>
                </BaseButton>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Product Type</span>
                <span class="font-medium">{{ product.product_type || 'Not specified' }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Material</span>
                <span class="font-medium">{{ product.material_type || 'Not specified' }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Weight</span>
                <span class="font-medium">{{ product.weight_grams || 0 }} grams</span>
              </div>
              
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Annual Units</span>
                <span class="font-medium">{{ formatNumber(product.units_per_year) || 'Not specified' }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Annual Weight</span>
                <span class="font-medium">{{ formatWeight(calculateAnnualWeight()) }}</span>
              </div>
              
              <div class="flex items-center justify-between py-2 border-b">
                <span class="text-muted">Biodegradable</span>
                <Badge :variant="product.is_biodegradable ? 'success' : 'danger'">
                  {{ product.is_biodegradable ? 'Yes' : 'No' }}
                </Badge>
              </div>
              
              <div class="flex items-center justify-between py-2">
                <span class="text-muted">Reusable</span>
                <Badge :variant="product.is_reusable ? 'success' : 'danger'">
                  {{ product.is_reusable ? 'Yes' : 'No' }}
                </Badge>
              </div>
              
              <div v-if="product.description" class="pt-4 border-t">
                <h3 class="font-medium mb-2">Description</h3>
                <p class="text-sm text-muted">{{ product.description }}</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Recyclability & Compliance -->
        <div>
          <BaseCard title="Recyclability & Circularity" elevated>
            <div class="space-y-6">
              <!-- Recyclability -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm uppercase font-medium text-muted">Recyclability Score</h3>
                  <span class="font-bold text-forest">{{ product.recyclability_percentage || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="h-2.5 rounded-full" 
                    :class="getRecyclabilityColorClass(product.recyclability_percentage)"
                    :style="`width: ${product.recyclability_percentage || 0}%`" 
                  ></div>
                </div>
                <p class="text-sm mt-1" :class="getRecyclabilityTextClass(product.recyclability_percentage)">
                  {{ getRecyclabilityLabel(product.recyclability_percentage) }}
                </p>
              </div>

              <!-- Recycled Content -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm uppercase font-medium text-muted">Recycled Content</h3>
                  <span class="font-bold text-forest">{{ product.recycled_content || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-info h-2.5 rounded-full" 
                    :style="`width: ${product.recycled_content || 0}%`" 
                  ></div>
                </div>
              </div>

              <!-- Circularity Score -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm uppercase font-medium text-muted">Circularity Score</h3>
                  <span class="font-bold text-forest">{{ calculateCircularityScore() }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="h-2.5 rounded-full" 
                    :class="getCircularityColorClass(calculateCircularityScore())"
                    :style="`width: ${calculateCircularityScore()}%`" 
                  ></div>
                </div>
                <p class="text-sm mt-1" :class="getCircularityTextClass(calculateCircularityScore())">
                  {{ getCircularityLabel(calculateCircularityScore()) }}
                </p>
              </div>

              <!-- Compliance Status -->
              <div class="pt-4 border-t">
                <div class="flex items-center mb-3">
                  <h3 class="text-sm uppercase font-medium text-muted">Compliance Status</h3>
                  <Badge 
                    :variant="getComplianceStatus()" 
                    class="ml-2"
                  >
                    {{ getComplianceLabel() }}
                  </Badge>
                </div>
                
                <div v-if="getComplianceIssues().length > 0">
                  <p class="text-sm font-medium mb-2">Issues to address:</p>
                  <ul class="text-sm space-y-2">
                    <li 
                      v-for="(issue, i) in getComplianceIssues()" 
                      :key="i" 
                      class="flex items-start bg-danger bg-opacity-5 p-2 rounded-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-danger mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ issue }}</span>
                    </li>
                  </ul>
                </div>
                
                <div v-else class="bg-success bg-opacity-5 p-2 rounded-md flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>This product meets all compliance requirements</span>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Environmental Impact -->
        <div>
          <BaseCard title="Environmental Impact" elevated>
            <div class="space-y-6">
              <!-- CO2 Impact -->
              <div>
                <h3 class="text-sm uppercase font-medium text-muted mb-2">CO2 Equivalent Impact</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-surface p-3 rounded-md">
                    <p class="text-muted text-xs">Per Unit</p>
                    <p class="font-bold text-forest text-xl">{{ calculateCO2PerUnit().toFixed(4) }} kg</p>
                  </div>
                  <div class="bg-surface p-3 rounded-md">
                    <p class="text-muted text-xs">Annual</p>
                    <p class="font-bold text-forest text-xl">{{ calculateAnnualCO2().toFixed(2) }} kg</p>
                  </div>
                </div>
              </div>
              
              <!-- Material Info -->
              <div class="pt-4 border-t">
                <h3 class="text-sm uppercase font-medium text-muted mb-2">Material Impact</h3>
                
                <div class="bg-surface p-3 rounded-md mb-3">
                  <div class="flex items-center justify-between">
                    <span class="text-muted text-sm">Decomposition Time</span>
                    <span class="font-medium">{{ getMaterialDecompositionTime() }}</span>
                  </div>
                </div>
                
                <div class="bg-surface p-3 rounded-md mb-3">
                  <div class="flex items-center justify-between">
                    <span class="text-muted text-sm">Water Usage Impact</span>
                    <div class="flex items-center">
                      <span v-for="i in getWaterImpactScore()" :key="i" class="text-info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                        </svg>
                      </span>
                      <span v-for="i in (5 - getWaterImpactScore())" :key="`empty-${i}`" class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-surface p-3 rounded-md">
                  <div class="flex items-center justify-between">
                    <span class="text-muted text-sm">Production Energy Impact</span>
                    <div class="flex items-center">
                      <span v-for="i in getEnergyImpactScore()" :key="i" class="text-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      <span v-for="i in (5 - getEnergyImpactScore())" :key="`empty-${i}`" class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Improvement Recommendations -->
              <div class="pt-4 border-t">
                <h3 class="text-sm uppercase font-medium text-forest mb-2">Recommendations</h3>
                <ul class="space-y-2">
                  <li v-for="(rec, i) in getRecommendations()" :key="i" class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="text-sm">{{ rec }}</span>
                  </li>
                </ul>
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

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();

// Local state
const loading = ref(true);
const product = ref(null);

// Fetch product details
onMounted(async () => {
  const productId = route.params.id;
  
  if (!productId) {
    // Use the router instance for navigation
    router.push('/data');
    return;
  }
  
  loading.value = true;
  
  try {
    const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { products } = useSupabaseApi();
    
    const response = await products.get(productId);
    
    if (response.data && response.data.length > 0) {
      product.value = response.data[0];
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    loading.value = false;
  }
});

// Helper function to format numbers with commas
function formatNumber(num) {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Helper function to format weight
function formatWeight(grams) {
  if (grams >= 1000000) {
    return `${(grams / 1000000).toFixed(2)} tonnes`;
  } else if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  } else {
    return `${grams.toFixed(2)} grams`;
  }
}

// Calculate annual weight
function calculateAnnualWeight() {
  if (!product.value) return 0;
  const weight = product.value.weight_grams || 0;
  const units = product.value.units_per_year || 0;
  return weight * units;
}

// Helper function to get recyclability color class
function getRecyclabilityColorClass(percentage) {
  if (percentage >= 70) return 'bg-success';
  if (percentage >= 30) return 'bg-warning';
  return 'bg-danger';
}

// Helper function to get recyclability text color class
function getRecyclabilityTextClass(percentage) {
  if (percentage >= 70) return 'text-success';
  if (percentage >= 30) return 'text-warning';
  return 'text-danger';
}

// Helper function to get recyclability label
function getRecyclabilityLabel(percentage) {
  if (percentage >= 70) return 'High recyclability - Meets most regulations';
  if (percentage >= 30) return 'Medium recyclability - Improvements needed';
  return 'Low recyclability - Not compliant with regulations';
}

// Calculate circularity score
// Circularity score formula: (Recyclability% * 0.4) + (Recycled% * 0.3) + (Reuse% * 0.2) + (Compliance * 0.1)
function calculateCircularityScore() {
  if (!product.value) return 0;
  
  const recyclability = product.value.recyclability_percentage || 0;
  const recycledContent = product.value.recycled_content || 0;
  const reuse = product.value.is_reusable ? 100 : 0;
  const biodegradable = product.value.is_biodegradable ? 100 : 0;
  
  // Calculate compliance component (simplified)
  let compliance = 0;
  if (recyclability >= 50 && recycledContent > 0) {
    compliance = 100;
  } else if (recyclability >= 30 || recycledContent > 0) {
    compliance = 50;
  }
  
  const score = (recyclability * 0.4) + (recycledContent * 0.3) + (reuse * 0.2) + ((compliance + biodegradable) / 2 * 0.1);
  return Math.round(score);
}

// Helper function to get circularity color class
function getCircularityColorClass(score) {
  if (score >= 60) return 'bg-success';
  if (score >= 30) return 'bg-warning';
  return 'bg-danger';
}

// Helper function to get circularity text color class
function getCircularityTextClass(score) {
  if (score >= 60) return 'text-success';
  if (score >= 30) return 'text-warning';
  return 'text-danger';
}

// Helper function to get circularity label
function getCircularityLabel(score) {
  if (score >= 60) return 'Good circular economy performance';
  if (score >= 30) return 'Moderate circularity - Improvements needed';
  return 'Poor circularity - Significant changes required';
}

// Get compliance status
function getComplianceStatus() {
  if (!product.value) return 'danger';
  
  const recyclability = product.value.recyclability_percentage || 0;
  const recycledContent = product.value.recycled_content || 0;
  
  if (
    (recyclability >= 70 && recycledContent > 0) ||
    (product.value.is_biodegradable && recyclability >= 50)
  ) {
    return 'success';
  }
  
  if (recyclability >= 30 || recycledContent >= 20) {
    return 'warning';
  }
  
  return 'danger';
}

// Helper function to get compliance label
function getComplianceLabel() {
  const status = getComplianceStatus();
  if (status === 'success') return 'Compliant';
  if (status === 'warning') return 'Partially Compliant';
  return 'Non-Compliant';
}

// Get compliance issues
function getComplianceIssues() {
  if (!product.value) return [];
  
  const issues = [];
  const recyclability = product.value.recyclability_percentage || 0;
  const recycledContent = product.value.recycled_content || 0;
  
  if (recyclability < 30) {
    issues.push('Recyclability below 30% - EPR regulations require minimum recyclability');
  } else if (recyclability < 50) {
    issues.push('Recyclability below 50% - Consider design improvements');
  }
  
  if (!recycledContent) {
    issues.push('No recycled content - Kenya EMCA recommends using recycled materials');
  } else if (recycledContent < 20) {
    issues.push('Low recycled content - Consider increasing recycled material usage');
  }
  
  if (!product.value.is_biodegradable && !product.value.is_reusable) {
    issues.push('Neither biodegradable nor reusable - Fails circular economy principles');
  }
  
  if (product.value.material_type === 'PVC' || product.value.material_type === 'PS') {
    issues.push(`${product.value.material_type} is being restricted under new regulations`);
  }
  
  return issues;
}

// Calculate CO2 impact per unit
function calculateCO2PerUnit() {
  if (!product.value) return 0;
  
  const { calculateEnvironmentalImpact } = require('~/utils/csvValidation');
  const impact = calculateEnvironmentalImpact(
    product.value.material_type || 'Other', 
    product.value.weight_grams || 0
  );
  
  return impact.co2Impact;
}

// Calculate annual CO2 impact
function calculateAnnualCO2() {
  return calculateCO2PerUnit() * (product.value?.units_per_year || 0);
}

// Get material decomposition time
function getMaterialDecompositionTime() {
  if (!product.value) return 'Unknown';
  
  const { calculateEnvironmentalImpact } = require('~/utils/csvValidation');
  const impact = calculateEnvironmentalImpact(
    product.value.material_type || 'Other', 
    product.value.weight_grams || 0
  );
  
  return `${impact.decompositionTime} years`;
}

// Get water impact score (1-5)
function getWaterImpactScore() {
  if (!product.value) return 0;
  
  // Simplified water impact scores
  const waterImpactScores = {
    'PET': 3,
    'HDPE': 2,
    'PVC': 5,
    'LDPE': 2,
    'PP': 2,
    'PS': 4,
    'Other': 3
  };
  
  return waterImpactScores[product.value.material_type] || 3;
}

// Get energy impact score (1-5)
function getEnergyImpactScore() {
  if (!product.value) return 0;
  
  // Simplified energy impact scores
  const energyImpactScores = {
    'PET': 4,
    'HDPE': 3,
    'PVC': 5,
    'LDPE': 3,
    'PP': 3,
    'PS': 4,
    'Other': 3
  };
  
  return energyImpactScores[product.value.material_type] || 3;
}

// Get improvement recommendations
function getRecommendations() {
  if (!product.value) return [];
  
  const recommendations = [];
  const recyclability = product.value.recyclability_percentage || 0;
  const recycledContent = product.value.recycled_content || 0;
  
  // Material-specific recommendations
  if (product.value.material_type === 'PVC') {
    recommendations.push('Consider replacing PVC with more environmentally friendly alternatives like PET or HDPE');
  }
  
  if (product.value.material_type === 'PS') {
    recommendations.push('Consider replacing polystyrene with more easily recyclable materials like PP or PET');
  }
  
  // Recyclability recommendations
  if (recyclability < 70) {
    recommendations.push('Improve design for recyclability by using single materials and avoiding labels or adhesives that hinder recycling');
  }
  
  // Recycled content recommendations
  if (recycledContent < 20) {
    recommendations.push('Increase recycled content to at least 20% to meet emerging standards');
  }
  
  // Weight recommendations
  if ((product.value.weight_grams || 0) > 20 && product.value.product_type === 'packaging') {
    recommendations.push('Consider lightweighting to reduce material usage and environmental impact');
  }
  
  // Biodegradability recommendations
  if (!product.value.is_biodegradable && ['packaging', 'wrapper'].includes(product.value.product_type)) {
    recommendations.push('Explore biodegradable alternatives for single-use packaging');
  }
  
  return recommendations;
}
</script>

<style>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #28A745;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
