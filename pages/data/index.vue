<!-- filepath: /home/clinton/repos/circularIQ/pages/data/index.vue -->
<template>
  <NuxtLayout name="dashboard">
    <div>
      <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-forest">Data Collection</h1>
        <p class="text-muted mt-1">Manage your product data and plastic usage information</p>
      </div>
      <div class="flex space-x-3">
        <BaseButton 
          variant="primary"
          icon
          @click="router.push('/data/entry')"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          Add Product
        </BaseButton>
        <BaseButton 
          variant="secondary"
          icon
          @click="router.push('/data/upload')"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </template>
          Upload CSV
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      <div class="lg:col-span-3">
        <BaseCard title="Filters" elevated>
          <div class="space-y-4">
            <div>
              <FormInput
                v-model="searchQuery"
                label="Search Products"
                placeholder="Product name or ID"
                icon-left="search"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Product Type
              </label>
              <select 
                v-model="filters.productType"
                class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              >
                <option :value="null">All Types</option>
                <option value="packaging">Packaging</option>
                <option value="container">Container</option>
                <option value="bottle">Bottle</option>
                <option value="wrapper">Wrapper</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Material Type
              </label>
              <select 
                v-model="filters.materialType"
                class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              >
                <option :value="null">All Materials</option>
                <option value="PET">PET</option>
                <option value="HDPE">HDPE</option>
                <option value="PVC">PVC</option>
                <option value="LDPE">LDPE</option>
                <option value="PP">PP</option>
                <option value="PS">PS</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-muted mb-1">
                Recyclability
              </label>
              <select 
                v-model="filters.recyclability"
                class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              >
                <option :value="null">All</option>
                <option value="high">High (>70%)</option>
                <option value="medium">Medium (30-70%)</option>
                <option value="low">Low (<30%)</option>
              </select>
            </div>
            
            <BaseButton 
              variant="outline" 
              class="w-full justify-center"
              @click="resetFilters"
            >
              Reset Filters
            </BaseButton>
          </div>
        </BaseCard>
      </div>
      
      <div class="lg:col-span-9">
        <BaseCard :title="`Products (${filteredProducts.length})`" elevated>
          <div v-if="loading.products" class="flex justify-center py-8">
            <div class="loader"></div>
          </div>
          
          <div v-else-if="!products.length" class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="text-lg font-medium text-forest">No products yet</h3>
            <p class="text-muted mt-1 mb-4">Get started by adding your first product or uploading a CSV file</p>
            <div class="flex justify-center space-x-3">
              <BaseButtonLink 
                to="/data/entry" 
                variant="primary"
                icon
              >
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </template>
                Add Product
              </BaseButtonLink>
              <BaseButtonLink 
                to="/data/upload" 
                variant="secondary"
                icon
              >
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </template>
                Upload CSV
              </BaseButtonLink>
            </div>
          </div>
          
          <div v-else>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Product</th>
                    <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                    <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Material</th>
                    <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Weight (g)</th>
                    <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Recyclability</th>
                    <th class="px-4 py-3 bg-surface text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in displayProducts" :key="product.id" class="hover:bg-surface">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <NuxtLink :to="`/data/product/${product.id}`" class="text-forest hover:text-primary font-medium">
                        {{ product.name }}
                      </NuxtLink>
                      <div class="text-xs text-muted">{{ product.sku || 'No SKU' }}</div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">{{ product.product_type || 'N/A' }}</td>
                    <td class="px-4 py-3 whitespace-nowrap">{{ product.material_type || 'N/A' }}</td>
                    <td class="px-4 py-3 whitespace-nowrap">{{ product.weight_grams || 0 }}g</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            class="h-2 rounded-full" 
                            :class="getRecyclabilityColorClass(product.recyclability_percentage)"
                            :style="`width: ${product.recyclability_percentage}%`" 
                          ></div>
                        </div>
                        <span>{{ product.recyclability_percentage || 0 }}%</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right">
                      <NuxtLink :to="`/data/product/${product.id}`" class="text-info hover:text-primary mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </NuxtLink>
                      <NuxtLink :to="`/data/entry?id=${product.id}`" class="text-info hover:text-primary mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </NuxtLink>
                      <button @click="deleteProduct(product.id)" class="text-danger hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Simple Pagination -->
            <div class="flex justify-between items-center mt-4 px-4">
              <div class="text-sm text-muted">
                Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredProducts.length) }} of {{ filteredProducts.length }}
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border border-gray-300"
                  :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
                >
                  Previous
                </button>
                <button 
                  @click="currentPage++"
                  :disabled="currentPage >= Math.ceil(filteredProducts.length / pageSize)"
                  class="px-3 py-1 rounded border border-gray-300"
                  :class="currentPage >= Math.ceil(filteredProducts.length / pageSize) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Recent Uploads Section -->
    <BaseCard title="Recent Data Uploads" class="mb-8">
      <div v-if="loading.uploads" class="py-8 text-center">
        <div class="loader"></div>
      </div>
      
      <div v-else-if="!uploads.length" class="text-center py-8">
        <p class="text-muted">No CSV uploads yet</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Filename</th>
              <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Size</th>
              <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Products</th>
              <th class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="upload in uploads" :key="upload.id">
              <td class="px-4 py-3 whitespace-nowrap font-medium">{{ upload.filename }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-muted">
                {{ new Date(upload.created_at).toLocaleString() }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-muted">
                {{ formatFileSize(upload.file_size) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                {{ upload.product_count || 0 }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <Badge :variant="upload.status === 'success' ? 'success' : upload.status === 'error' ? 'danger' : 'warning'">
                  {{ upload.status }}
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePlasticDataStore } from '~/stores/plasticData';

definePageMeta({
  layout: false,
});

const plasticDataStore = usePlasticDataStore();
const route = useRoute();

// Local state
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

// Access store state
const { products, uploads, loading, filters } = plasticDataStore;

// Fetch data on component mount
onMounted(async () => {
  await Promise.all([
    plasticDataStore.fetchProducts(),
    plasticDataStore.fetchUploads()
  ]);
});

// Reset pagination when filters change
watch(() => [searchQuery.value, filters.productType, filters.materialType, filters.recyclability], () => {
  currentPage.value = 1;
});

// Filtered products based on search and filters
const filteredProducts = computed(() => {
  return products.filter(product => {
    // Search filter
    const searchMatch = !searchQuery.value || 
      product.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      product.sku?.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // Product type filter
    const productTypeMatch = !filters.productType || 
      product.product_type === filters.productType;
    
    // Material type filter
    const materialTypeMatch = !filters.materialType || 
      product.material_type === filters.materialType;
    
    // Recyclability filter
    let recyclabilityMatch = true;
    if (filters.recyclability === 'high') {
      recyclabilityMatch = product.recyclability_percentage >= 70;
    } else if (filters.recyclability === 'medium') {
      recyclabilityMatch = product.recyclability_percentage >= 30 && product.recyclability_percentage < 70;
    } else if (filters.recyclability === 'low') {
      recyclabilityMatch = product.recyclability_percentage < 30;
    }
    
    return searchMatch && productTypeMatch && materialTypeMatch && recyclabilityMatch;
  });
});

// Paginated products for current page
const displayProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredProducts.value.slice(start, end);
});

// Helper function to get recyclability color class
function getRecyclabilityColorClass(percentage) {
  if (percentage >= 70) return 'bg-success';
  if (percentage >= 30) return 'bg-warning';
  return 'bg-danger';
}

// Reset all filters
function resetFilters() {
  searchQuery.value = '';
  filters.productType = null;
  filters.materialType = null;
  filters.recyclability = null;
  currentPage.value = 1;
}

// Format file size in human-readable format
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Delete product
async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    await plasticDataStore.deleteProduct(id);
    await plasticDataStore.fetchProducts();
  }
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
