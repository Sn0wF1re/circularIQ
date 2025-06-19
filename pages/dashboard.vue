<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Total Products Card -->
        <BaseCard compact>
          <div class="flex items-center">
            <div class="flex-shrink-0 h-12 w-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-muted">Total Products</h3>
              <div class="flex items-baseline">
                <p class="text-2xl font-semibold text-forest">
                  {{ plasticStore.totalProducts }}
                </p>
                <p class="ml-2 text-sm text-success">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span class="ml-1">+7%</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
        
        <!-- Total Plastic Weight Card -->
        <BaseCard compact>
          <div class="flex items-center">
            <div class="flex-shrink-0 h-12 w-12 bg-info bg-opacity-10 rounded-lg flex items-center justify-center text-info">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-muted">Total Plastic</h3>
              <div class="flex items-baseline">
                <p class="text-2xl font-semibold text-forest">
                  {{ formatWeight(plasticStore.totalPlasticWeight) }}
                </p>
                <p class="ml-2 text-sm text-danger">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span class="ml-1">-2%</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
        
        <!-- Average Recyclability Card -->
        <BaseCard compact>
          <div class="flex items-center">
            <div class="flex-shrink-0 h-12 w-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center text-success">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-muted">Avg. Recyclability</h3>
              <div class="flex items-baseline">
                <p class="text-2xl font-semibold text-forest">
                  {{ formatPercentage(plasticStore.averageRecyclability) }}
                </p>
                <p class="ml-2 text-sm text-success">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span class="ml-1">+5%</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
        
        <!-- Compliance Score Card -->
        <BaseCard compact>
          <div class="flex items-center">
            <div class="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center" :class="complianceBgClass">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="complianceTextClass">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-muted">Compliance</h3>
              <div class="flex items-baseline">
                <p class="text-2xl font-semibold text-forest">
                  {{ formatPercentage(plasticStore.complianceScore) }}
                </p>
                <p class="ml-2">
                  <Badge :variant="plasticStore.complianceColor">{{ plasticStore.complianceStatus }}</Badge>
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      
      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Material Breakdown Chart -->
        <BaseCard title="Material Breakdown" variant="primary" elevated>
          <div v-if="loading" class="flex justify-center items-center py-16">
            <p class="text-muted">Loading chart data...</p>
          </div>
          <div v-else class="h-80">
            <client-only>
              <apexchart 
                type="pie"
                :options="materialChartOptions"
                :series="materialChartSeries"
                height="100%"
              ></apexchart>
            </client-only>
          </div>
        </BaseCard>
        
        <!-- Monthly Plastic Usage Chart -->
        <BaseCard title="Monthly Plastic Usage" variant="primary" elevated>
          <div v-if="loading" class="flex justify-center items-center py-16">
            <p class="text-muted">Loading chart data...</p>
          </div>
          <div v-else class="h-80">
            <client-only>
              <apexchart 
                type="bar"
                :options="monthlyChartOptions"
                :series="monthlyChartSeries"
                height="100%"
              ></apexchart>
            </client-only>
          </div>
        </BaseCard>
      </div>
      
      <!-- Recent Products Table -->
      <BaseCard title="Recent Products" elevated>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Product Name
                </th>
                <th class="px-6 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Material Type
                </th>
                <th class="px-6 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Weight (g)
                </th>
                <th class="px-6 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Recyclability
                </th>
                <th class="px-6 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="5" class="px-6 py-4 text-center text-muted">
                  Loading products...
                </td>
              </tr>
              <tr v-else-if="plasticStore.products.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-muted">
                  No products available. Start by adding your first product.
                </td>
              </tr>
              <tr v-for="product in recentProducts" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-forest">
                  {{ product.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {{ product.material_type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {{ product.weight_grams }} g
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        class="h-2 rounded-full"
                        :class="recyclabilityColorClass(product.recyclability_percentage)"
                        :style="{ width: `${product.recyclability_percentage}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-muted">{{ product.recyclability_percentage }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge v-if="product.is_compliant" variant="success">Compliant</Badge>
                  <Badge v-else variant="danger">Non-Compliant</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template #footer>
          <div class="flex justify-between items-center">
            <p class="text-sm text-muted">
              Showing {{ Math.min(5, plasticStore.products.length) }} of {{ plasticStore.products.length }} products
            </p>
            <NuxtLink to="/data">
              <BaseButton variant="outline" size="sm">
                View All Products
              </BaseButton>
            </NuxtLink>
          </div>
        </template>
      </BaseCard>
      
      <!-- Quick Links -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <BaseCard title="Quick Actions" variant="info">
          <div class="space-y-3">
            <NuxtLink to="/data/entry" class="flex items-center p-3 hover:bg-info hover:bg-opacity-5 rounded-md">
              <div class="w-8 h-8 bg-info bg-opacity-10 rounded-full flex items-center justify-center text-info mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span class="text-sm font-medium">Add New Product</span>
            </NuxtLink>
            <NuxtLink to="/data/upload" class="flex items-center p-3 hover:bg-info hover:bg-opacity-5 rounded-md">
              <div class="w-8 h-8 bg-info bg-opacity-10 rounded-full flex items-center justify-center text-info mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span class="text-sm font-medium">Upload CSV Data</span>
            </NuxtLink>
            <NuxtLink to="/reports" class="flex items-center p-3 hover:bg-info hover:bg-opacity-5 rounded-md">
              <div class="w-8 h-8 bg-info bg-opacity-10 rounded-full flex items-center justify-center text-info mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-sm font-medium">Generate Report</span>
            </NuxtLink>
          </div>
        </BaseCard>
        
        <BaseCard title="Compliance Tips" variant="warning">
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-warning mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your NEMA quarterly report is due in 15 days</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-warning mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>3 products have recyclability below 30% threshold</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-warning mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>KEPRO fees due by the end of this month</span>
            </li>
          </ul>
          <div class="mt-4">
            <NuxtLink to="/compliance">
              <BaseButton variant="outline" size="sm">View Compliance Details</BaseButton>
            </NuxtLink>
          </div>
        </BaseCard>
        
        <BaseCard title="Recent Activity" variant="success">
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="w-8 h-8 bg-success bg-opacity-10 rounded-full flex items-center justify-center text-success mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p class="text-sm">
                  <span class="font-medium">John Doe</span> added a new product
                </p>
                <p class="text-xs text-muted">2 hours ago</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-8 h-8 bg-info bg-opacity-10 rounded-full flex items-center justify-center text-info mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm">
                  <span class="font-medium">Jane Smith</span> generated a report
                </p>
                <p class="text-xs text-muted">Yesterday</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p class="text-sm">
                  <span class="font-medium">System</span> imported 35 products
                </p>
                <p class="text-xs text-muted">2 days ago</p>
              </div>
            </li>
          </ul>
        </BaseCard>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePlasticDataStore } from '@/stores/plasticData';

// Set page metadata
useHead({
  title: 'Dashboard - CircularIQ',
  meta: [
    { name: 'description', content: 'CircularIQ Dashboard - View your sustainability metrics at a glance.' }
  ]
});

definePageMeta({
  layout: false,
});

const plasticStore = usePlasticDataStore();
const loading = ref(true);

// Format utilities
const formatWeight = (weight) => {
  if (weight >= 1000000) {
    return `${(weight / 1000000).toFixed(2)} tons`;
  } else if (weight >= 1000) {
    return `${(weight / 1000).toFixed(2)} kg`;
  }
  return `${weight.toFixed(0)} g`;
};

const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

// Recent products
const recentProducts = computed(() => {
  return plasticStore.products.slice(0, 5);
});

// Recyclability color
const recyclabilityColorClass = (percentage) => {
  if (percentage >= 80) return 'bg-success';
  if (percentage >= 50) return 'bg-warning';
  return 'bg-danger';
};

// Compliance styling
const complianceBgClass = computed(() => {
  switch (plasticStore.complianceColor) {
    case 'success': return 'bg-success bg-opacity-10';
    case 'warning': return 'bg-warning bg-opacity-10';
    case 'danger': return 'bg-danger bg-opacity-10';
    default: return 'bg-muted bg-opacity-10';
  }
});

const complianceTextClass = computed(() => {
  switch (plasticStore.complianceColor) {
    case 'success': return 'text-success';
    case 'warning': return 'text-warning';
    case 'danger': return 'text-danger';
    default: return 'text-muted';
  }
});

// Material breakdown chart
const materialChartOptions = ref({
  chart: {
    type: 'pie',
    fontFamily: 'Inter, sans-serif',
  },
  labels: [],
  colors: ['#28A745', '#98FF98', '#34D399', '#14532D', '#3B82F6', '#FBBF24', '#EF4444'],
  legend: {
    position: 'bottom',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ],
  tooltip: {
    y: {
      formatter: function(value) {
        return value + ' products';
      }
    }
  }
});

const materialChartSeries = ref([]);

// Monthly usage chart
const monthlyChartOptions = ref({
  chart: {
    type: 'bar',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '50%',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    labels: {
      style: {
        colors: '#6B7280'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Weight (kg)',
      style: {
        color: '#6B7280'
      }
    },
    labels: {
      style: {
        colors: '#6B7280'
      }
    }
  },
  fill: {
    opacity: 1
  },
  colors: ['#28A745', '#3B82F6'],
  tooltip: {
    y: {
      formatter: function(val) {
        return val + " kg";
      }
    }
  }
});

const monthlyChartSeries = ref([
  {
    name: 'Plastic Usage',
    data: [44, 55, 57, 56, 61, 58]
  },
  {
    name: 'Recycled Content',
    data: [24, 28, 32, 34, 39, 41]
  }
]);

// Fetch data when component mounts
onMounted(async () => {
  loading.value = true;
  
  try {
    // Fetch products
    await plasticStore.fetchProductsFromSupabase();
    
    // Fetch compliance scores
    await plasticStore.fetchComplianceScores();
    
    // Update material chart data
    const materialCounts = plasticStore.materialTypeCounts;
    materialChartOptions.value.labels = Object.keys(materialCounts);
    materialChartSeries.value = Object.values(materialCounts);
    
    // Update monthly usage chart with real data
    if (plasticStore.monthlyUsageData && plasticStore.monthlyUsageData.length > 0) {
      monthlyChartOptions.value.xaxis.categories = plasticStore.monthlyUsageData.map(d => d.month);
      monthlyChartSeries.value = [
        {
          name: 'Plastic Usage',
          data: plasticStore.monthlyUsageData.map(d => d.usage)
        },
        {
          name: 'Recycled Content',
          data: plasticStore.monthlyUsageData.map(d => d.recycled)
        }
      ];
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  } finally {
    loading.value = false;
  }
});
</script>
