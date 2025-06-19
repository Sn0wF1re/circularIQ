<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-forest">Compliance</h1>
        <p class="text-muted">Monitor your regulatory compliance and EPR readiness.</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="flex flex-col items-center">
          <svg class="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-muted">Loading compliance data...</p>
        </div>
      </div>

      <div v-else>
        <!-- Compliance Score Overview -->
        <div class="mb-8">
          <BaseCard>
            <div class="p-4">
              <h2 class="text-lg font-semibold text-forest mb-4">Compliance Overview</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col items-center">
                  <div class="mb-2 text-sm font-medium text-muted">Overall Score</div>
                  <div class="relative h-32 w-32">
                    <svg class="h-32 w-32" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        stroke-width="3"
                      />
                      <path
                        :class="[
                          complianceScore >= 80 ? 'stroke-success' : 
                          complianceScore >= 60 ? 'stroke-warning' : 
                          'stroke-danger'
                        ]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke-width="3"
                        :stroke-dasharray="`${complianceScore}, 100`"
                      />
                    </svg>
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                      <span class="text-3xl font-bold" :class="[
                        complianceScore >= 80 ? 'text-success' : 
                        complianceScore >= 60 ? 'text-warning' : 
                        'text-danger'
                      ]">{{ complianceScore }}%</span>
                      <span class="text-xs text-muted">Compliant</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="mb-2 text-sm font-medium text-muted">Status</div>
                  <div class="flex items-center mb-4">
                    <StatusDot :color="complianceStatus === 'Compliant' ? 'success' : complianceStatus === 'Partially Compliant' ? 'warning' : 'danger'" />
                    <span class="ml-2 font-medium">{{ complianceStatus }}</span>
                  </div>
                  <div class="text-sm text-muted">
                    <p>{{ complianceMessage }}</p>
                  </div>
                </div>

                <div>
                  <div class="mb-2 text-sm font-medium text-muted">Next Steps</div>
                  <ul class="text-sm space-y-2">
                    <li v-for="(step, index) in complianceSteps" :key="index" class="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {{ step }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Compliance Breakdown -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-forest mb-4">Compliance Categories</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- EPR Registration -->
            <BaseCard>
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-forest">EPR Registration</h3>
                  <Badge :color="eprStatus === 'Registered' ? 'success' : 'danger'">{{ eprStatus }}</Badge>
                </div>
                <p class="text-sm text-muted mb-4">{{ eprMessage }}</p>
                <div class="flex justify-end">
                  <button class="btn btn-primary" v-if="eprStatus !== 'Registered'">Register Now</button>
                  <button class="btn btn-outline" v-else>View Details</button>
                </div>
              </div>
            </BaseCard>

            <!-- Product Documentation -->
            <BaseCard>
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-forest">Product Documentation</h3>
                  <Badge :color="docScore >= 80 ? 'success' : docScore >= 60 ? 'warning' : 'danger'">{{ docScore }}%</Badge>
                </div>
                <p class="text-sm text-muted mb-4">{{ productDocMessage }}</p>
                <div class="flex justify-end">
                  <button class="btn btn-primary">Improve Documentation</button>
                </div>
              </div>
            </BaseCard>

            <!-- Recyclability Standards -->
            <BaseCard>
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-forest">Recyclability Standards</h3>
                  <Badge :color="recyclabilityScore >= 80 ? 'success' : recyclabilityScore >= 60 ? 'warning' : 'danger'">{{ recyclabilityScore }}%</Badge>
                </div>
                <p class="text-sm text-muted mb-4">{{ recyclabilityMessage }}</p>
                <div class="flex justify-end">
                  <button class="btn btn-primary">View Recommendations</button>
                </div>
              </div>
            </BaseCard>

            <!-- Labeling Requirements -->
            <BaseCard>
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-forest">Labeling Requirements</h3>
                  <Badge :color="labelingScore >= 80 ? 'success' : labelingScore >= 60 ? 'warning' : 'danger'">{{ labelingScore }}%</Badge>
                </div>
                <p class="text-sm text-muted mb-4">{{ labelingMessage }}</p>
                <div class="flex justify-end">
                  <button class="btn btn-primary">Improve Labeling</button>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Non-compliant Products -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-forest mb-4">Non-compliant Products</h2>
          <BaseCard>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Product Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Material</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Issue</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Recommendation</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="nonCompliantProducts.length === 0">
                    <td colspan="5" class="px-6 py-4 text-center text-muted">
                      No non-compliant products found. Great job!
                    </td>
                  </tr>
                  <tr v-for="product in nonCompliantProducts" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ product.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ product.material_type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-danger">{{ product.compliance_issue }}</td>
                    <td class="px-6 py-4 text-sm text-muted">{{ product.recommendation }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-primary hover:text-primary-hover">Fix Issue</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePlasticDataStore } from '@/stores/plasticData';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  layout: false,
});

// Get stores
const plasticStore = usePlasticDataStore();
const authStore = useAuthStore();

// Reactive state
const eprStatus = ref('Not Registered');
const docScore = ref(65);
const recyclabilityScore = ref(72);
const labelingScore = ref(45);
const nonCompliantProducts = ref([]);
const isLoading = ref(true);

// Computed properties
const complianceScore = computed(() => plasticStore.complianceScore || 0);
const complianceStatus = computed(() => plasticStore.complianceStatus || 'Not Evaluated');

const complianceMessage = computed(() => {
  const score = complianceScore.value;
  if (score >= 80) return 'Your company is currently meeting regulatory requirements for plastic packaging in Kenya. Continue maintaining good practices.';
  if (score >= 60) return 'Your company is partially compliant with regulations. Address the issues flagged in non-compliant products to improve your score.';
  return 'Your compliance score is below regulatory requirements. Immediate action is required to meet EPR obligations.';
});

const complianceSteps = computed(() => {
  const score = complianceScore.value;
  if (score >= 80) {
    return [
      'Continue monitoring changes in EPR regulations',
      'Consider improving recyclability of remaining products',
      'Explore additional eco-friendly packaging options'
    ];
  } else if (score >= 60) {
    return [
      'Address non-compliant product issues',
      'Complete EPR registration process',
      'Improve product documentation and labeling'
    ];
  } else {
    return [
      'Register with NEMA EPR scheme immediately',
      'Prioritize fixing highest impact non-compliant products',
      'Schedule compliance consultation with our support team'
    ];
  }
});

const eprMessage = computed(() => {
  return eprStatus.value === 'Registered' 
    ? 'Your company is registered with the NEMA EPR scheme. Registration is valid until December 31, 2025.' 
    : 'Your company needs to register with the NEMA Extended Producer Responsibility (EPR) scheme to comply with regulations.';
});

const productDocMessage = computed(() => {
  return 'Product documentation is partially complete. Ensure all products have complete material specifications and weights.';
});

const recyclabilityMessage = computed(() => {
  return `Average recyclability of your products is at ${recyclabilityScore.value}%. Kenya's EPR regulations target 80% recyclability by 2026.`;
});

const labelingMessage = computed(() => {
  return 'Most products lack proper recycling labels and material identification codes required by the regulations.';
});

// Fetch compliance data from Supabase
async function fetchComplianceData() {
  if (!authStore.isAuthenticated || !authStore.companyId) return;
  
  isLoading.value = true;
  
  try {
    // Fetch compliance scores
    await plasticStore.fetchComplianceScores();
    
    // Fetch products if not already loaded
    if (plasticStore.products.length === 0) {
      await plasticStore.fetchProductsFromSupabase();
    }
    
    // Check EPR registration status from company data
    if (authStore.company) {
      eprStatus.value = authStore.company.epr_registered ? 'Registered' : 'Not Registered';
    }
    
    // Calculate documentation score based on product data completeness
    if (plasticStore.products.length > 0) {
      const totalProducts = plasticStore.products.length;
      let completeDocProducts = 0;
      
      plasticStore.products.forEach(product => {
        // Check if product has complete documentation
        const hasCompleteDoc = product.weight_grams && 
                              product.material_type && 
                              product.recyclability_percentage;
        
        if (hasCompleteDoc) completeDocProducts++;
      });
      
      docScore.value = Math.round((completeDocProducts / totalProducts) * 100);
      
      // Set recyclability score from computed average
      recyclabilityScore.value = Math.round(plasticStore.averageRecyclability);
      
      // Calculate labeling score
      const productsWithLabels = plasticStore.products.filter(p => p.has_recycling_label).length;
      labelingScore.value = Math.round((productsWithLabels / totalProducts) * 100);
      
      // Get non-compliant products
      nonCompliantProducts.value = plasticStore.products
        .filter(p => (p.recyclability_percentage || 0) < 50 || !p.has_recycling_label)
        .map(p => ({
          ...p,
          compliance_issue: p.recyclability_percentage < 50 ? 'Low recyclability' : 'Missing recycling label',
          recommendation: p.recyclability_percentage < 50 
            ? 'Consider alternative packaging materials with higher recyclability ratings'
            : 'Add proper recycling label with material identification'
        }));
    }
  } catch (error) {
    console.error('Error fetching compliance data:', error);
  } finally {
    isLoading.value = false;
  }
}

// Fetch data on component mount
onMounted(async () => {
  await fetchComplianceData();
});

// Set page metadata
useHead({
  title: 'Compliance - CircularIQ',
  meta: [
    { name: 'description', content: 'Monitor your regulatory compliance with Kenya\'s EMCA and EPR regulations.' }
  ]
});
</script>
