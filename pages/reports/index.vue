<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-forest">Reports</h1>
        <p class="text-muted">View and generate reports for your sustainability data.</p>
      </div>

      <!-- Report Selection Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Footprint Report Card -->
        <BaseCard>
          <div class="p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-forest">Plastic Footprint Report</h3>
              </div>
              <Badge color="success">Monthly</Badge>
            </div>
            <p class="text-sm text-muted mb-4">Comprehensive overview of your plastic usage, recyclability, and waste metrics.</p>
            <div class="flex justify-end">
              <button 
                class="btn btn-primary" 
                @click="generateReport('footprint')"
                :disabled="!authStore.isAuthenticated"
              >
                Generate Report
              </button>
            </div>
          </div>
        </BaseCard>

        <!-- Compliance Report Card -->
        <BaseCard>
          <div class="p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-forest">Compliance Report</h3>
              </div>
              <Badge color="warning">Quarterly</Badge>
            </div>
            <p class="text-sm text-muted mb-4">Detailed analysis of your compliance with NEMA regulations and EPR guidelines.</p>
            <div class="flex justify-end">
              <button 
                class="btn btn-primary"
                @click="generateReport('compliance')"
                :disabled="!authStore.isAuthenticated"
              >
                Generate Report
              </button>
            </div>
          </div>
        </BaseCard>

        <!-- Trend Analysis Card -->
        <BaseCard>
          <div class="p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-forest">Trend Analysis</h3>
              </div>
              <Badge color="info">Custom</Badge>
            </div>
            <p class="text-sm text-muted mb-4">Historical analysis of your company's sustainability metrics over time.</p>
            <div class="flex justify-end">
              <button 
                class="btn btn-primary"
                @click="generateReport('trend')"
                :disabled="!authStore.isAuthenticated"
              >
                Generate Report
              </button>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Recent Reports -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-forest mb-4">Recent Reports</h2>
        <BaseCard>
          <div class="overflow-x-auto">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <div class="flex flex-col items-center">
                <svg class="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-muted">Loading reports...</p>
              </div>
            </div>
            
            <!-- Reports Table -->
            <table v-else class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Report Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Generated On</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="!isLoading && footprintReports.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-muted">
                    No reports generated yet. Create your first report using the options above.
                  </td>
                </tr>
                <tr v-for="report in footprintReports" :key="report.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ report.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ report.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ formatDate(report.generated_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Badge :color="report.status === 'Completed' ? 'success' : 'warning'">
                      {{ report.status }}
                      <span v-if="report.status === 'Processing'" class="ml-1 inline-block">
                        <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </Badge>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a v-if="report.status === 'Completed'" href="#" class="text-primary hover:text-primary-hover">Download</a>
                    <span v-else class="text-muted">Processing...</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePlasticDataStore } from '@/stores/plasticData';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  layout: false,
});

// Get stores
const plasticStore = usePlasticDataStore();
const authStore = useAuthStore();

// Local state
const footprintReports = ref([]);
const isLoading = ref(false);

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Fetch reports from Supabase
async function fetchReports() {
  if (!authStore.isAuthenticated || !authStore.companyId) return;
  
  isLoading.value = true;
  
  try {
    const { useSupabase } = await import('~/composables/useSupabase');
    const supabase = useSupabase();
    
    if (!supabase) {
      console.error('Supabase client not available');
      return;
    }
    
    // Fetch footprint reports
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('company_id', authStore.companyId)
      .order('generated_at', { ascending: false });
      
    if (error) throw error;
    
    if (data) {
      footprintReports.value = data;
    } else {
      // For demo purposes, generate sample reports if none exist
      footprintReports.value = [
        {
          id: 1,
          name: 'May 2025 Plastic Footprint',
          type: 'Footprint Report',
          generated_at: new Date().toISOString(),
          status: 'Completed',
          company_id: authStore.companyId
        },
        {
          id: 2,
          name: 'Q2 2025 Compliance Analysis',
          type: 'Compliance Report',
          generated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Completed',
          company_id: authStore.companyId
        },
        {
          id: 3,
          name: 'YTD Recyclability Trend Analysis',
          type: 'Trend Analysis',
          generated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Completed',
          company_id: authStore.companyId
        }
      ];
    }
  } catch (error) {
    console.error('Error fetching reports:', error);
  } finally {
    isLoading.value = false;
  }
}

// Generate a new report
async function generateReport(reportType) {
  if (!authStore.isAuthenticated || !authStore.companyId) return;
  
  try {
    const { useSupabase } = await import('~/composables/useSupabase');
    const supabase = useSupabase();
    
    if (!supabase) {
      console.error('Supabase client not available');
      return;
    }
    
    const currentDate = new Date();
    let reportName = '';
    
    switch (reportType) {
      case 'footprint':
        reportName = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()} Plastic Footprint`;
        break;
      case 'compliance':
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        reportName = `Q${quarter} ${currentDate.getFullYear()} Compliance Analysis`;
        break;
      case 'trend':
        reportName = `${currentDate.toLocaleString('default', { year: 'numeric', month: 'long' })} Trend Analysis`;
        break;
      default:
        reportName = `Custom Report ${currentDate.toLocaleDateString()}`;
    }
    
    const newReport = {
      name: reportName,
      type: reportType === 'footprint' ? 'Footprint Report' : 
            reportType === 'compliance' ? 'Compliance Report' : 'Trend Analysis',
      generated_at: new Date().toISOString(),
      status: 'Processing',
      company_id: authStore.companyId
    };
    
    // Save the new report
    const { data, error } = await supabase
      .from('reports')
      .insert(newReport)
      .select();
      
    if (error) throw error;
    
    if (data) {
      // Add the new report to the list
      footprintReports.value = [data[0], ...footprintReports.value];
      
      // Simulate processing time
      setTimeout(async () => {
        // Update the status to completed
        const { error: updateError } = await supabase
          .from('reports')
          .update({ status: 'Completed' })
          .eq('id', data[0].id);
          
        if (!updateError) {
          // Update local state
          const index = footprintReports.value.findIndex(r => r.id === data[0].id);
          if (index !== -1) {
            footprintReports.value[index].status = 'Completed';
          }
        }
      }, 3000);
    }
    
  } catch (error) {
    console.error('Error generating report:', error);
  }
}

// Fetch data
onMounted(async () => {
  await fetchReports();
});

// Set page metadata
useHead({
  title: 'Reports - CircularIQ',
  meta: [
    { name: 'description', content: 'Generate and download plastic usage and compliance reports for your business.' }
  ]
});
</script>
