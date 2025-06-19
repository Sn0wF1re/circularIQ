import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from './auth';

export const usePlasticDataStore = defineStore('plasticData', () => {
  // State
  const products = ref([]);
  const uploads = ref([]);
  const footprintReports = ref([]);
  const complianceScores = ref([]);
  const loading = ref({
    products: false,
    uploads: false,
    footprint: false,
    compliance: false
  });
  const filters = ref({
    productType: null,
    materialType: null,
    recyclability: null,
    dateRange: null
  });

  // Getters
  // Product stats
  const totalProducts = computed(() => products.value.length);
  
  const totalPlasticWeight = computed(() => {
    return products.value.reduce((total, product) => {
      return total + (product.weight_grams || 0);
    }, 0);
  });
  
  const averageRecyclability = computed(() => {
    if (!products.value.length) return 0;
    const totalRecyclability = products.value.reduce((total, product) => {
      return total + (product.recyclability_percentage || 0);
    }, 0);
    return totalRecyclability / products.value.length;
  });
  
  const materialTypeCounts = computed(() => {
    return products.value.reduce((counts, product) => {
      const material = product.material_type || 'Unknown';
      counts[material] = (counts[material] || 0) + 1;
      return counts;
    }, {});
  });
  
  // Compliance stats
  const complianceScore = computed(() => {
    if (!complianceScores.value.length) return 0;
    return complianceScores.value[0]?.score || 0;
  });
  
  const complianceStatus = computed(() => {
    const score = complianceScores.value[0]?.score || 0;
    if (score >= 80) return 'Compliant';
    if (score >= 60) return 'Partially Compliant';
    return 'Non-Compliant';
  });
  
  const complianceColor = computed(() => {
    const score = complianceScores.value[0]?.score || 0;
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  });
    
  // Filtered products
  const filteredProducts = computed(() => {
    let result = [...products.value];
    
    if (filters.value.productType) {
      result = result.filter(p => p.product_type === filters.value.productType);
    }
    
    if (filters.value.materialType) {
      result = result.filter(p => p.material_type === filters.value.materialType);
    }
    
    if (filters.value.recyclability) {
      const min = filters.value.recyclability.min || 0;
      const max = filters.value.recyclability.max || 100;
      result = result.filter(p => 
        p.recyclability_percentage >= min && 
        p.recyclability_percentage <= max
      );
    }
    
    if (filters.value.dateRange) {
      const startDate = new Date(filters.value.dateRange.start);
      const endDate = new Date(filters.value.dateRange.end);
      
      result = result.filter(p => {
        const createdAt = new Date(p.created_at);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }
    
    return result;
  });

  // Actions
  function setFilter(key, value) {
    filters.value[key] = value;
  }
  
  function clearFilters() {
    filters.value = {
      productType: null,
      materialType: null,
      recyclability: null,
      dateRange: null
    };
  }
    
  // Product actions
  async function fetchProducts() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    loading.value.products = true;
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { products: productsApi } = useSupabaseApi();
      
      const { data, error } = await productsApi.list(
        { company_id: authStore.companyId }
      );
      
      if (error) throw error;
      if (data) {
        products.value = data;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loading.value.products = false;
    }
  }
    
  async function createProduct(productData) {
    const authStore = useAuthStore();
    if (!authStore.companyId) return { success: false, message: 'No company selected' };
    
    // Ensure company_id is set
    const dataWithCompany = {
      ...productData,
      company_id: authStore.companyId
    };
    
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { products: productsApi } = useSupabaseApi();
      
      const { data, error } = await productsApi.create(dataWithCompany);
      
      if (error) throw error;
      if (data && data.length > 0) {
        products.value.push(data[0]);
        return { success: true, data: data[0] };
      }
      return { success: false, message: 'Failed to add product' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  // For backward compatibility
  async function addProduct(productData) {
    return createProduct(productData);
  }

  // Fetch products directly from Supabase for dashboard display
  async function fetchProductsFromSupabase() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    loading.value.products = true;
    try {
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (!supabase) {
        // Fall back to API-based fetch if direct Supabase access fails
        return fetchProducts();
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('company_id', authStore.companyId);
        
      if (error) throw error;
      if (data) {
        products.value = data;
        
        // Also fetch monthly usage data
        await fetchMonthlyUsageData();
      }
    } catch (error) {
      console.error('Error fetching products from Supabase:', error);
      // Fall back to API-based fetch
      return fetchProducts();
    } finally {
      loading.value.products = false;
    }
  }
  
  // Monthly plastic usage data for charts
  const monthlyUsageData = ref([]);
  
  // Fetch monthly usage data from Supabase
  async function fetchMonthlyUsageData() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    loading.value.footprint = true;
    try {
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (!supabase) return;
      
      // Get the last 6 months of data
      const { data, error } = await supabase
        .from('footprint_reports')
        .select('*')
        .eq('company_id', authStore.companyId)
        .order('report_date', { ascending: false })
        .limit(6);
        
      if (error) throw error;
      if (data) {
        // Format the data for the chart
        monthlyUsageData.value = data.map(report => ({
          month: new Date(report.report_date).toLocaleString('default', { month: 'short' }),
          usage: report.total_weight_kg,
          recycled: report.recycled_content_kg
        })).reverse(); // Reverse to show in chronological order
      }
    } catch (error) {
      console.error('Error fetching monthly usage data:', error);
    } finally {
      loading.value.footprint = false;
    }
  }
  
  // Fetch compliance scores from Supabase
  async function fetchComplianceScores() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    loading.value.compliance = true;
    try {
      const { useSupabase } = await import('~/composables/useSupabase');
      const supabase = useSupabase();
      
      if (!supabase) {
        // Fall back to API-based fetch if needed
        return fetchComplianceScoresViaApi();
      }
      
      const { data, error } = await supabase
        .from('compliance_scores')
        .select('*')
        .eq('company_id', authStore.companyId)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (error) throw error;
      if (data && data.length > 0) {
        complianceScores.value = data;
      }
    } catch (error) {
      console.error('Error fetching compliance scores:', error);
      // Fall back to API-based fetch
      return fetchComplianceScoresViaApi();
    } finally {
      loading.value.compliance = false;
    }
  }
  
  // Fetch compliance scores via API as fallback
  async function fetchComplianceScoresViaApi() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { compliance: complianceApi } = useSupabaseApi();
      
      const { data, error } = await complianceApi.getScores(authStore.companyId);
      
      if (error) throw error;
      if (data) {
        complianceScores.value = data;
      }
    } catch (error) {
      console.error('Error fetching compliance scores via API:', error);
    }
  }
    
  async function updateProduct(id, productData) {
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { products: productsApi } = useSupabaseApi();
      
      const { data, error } = await productsApi.update(id, productData);
      
      if (error) throw error;
      if (data && data.length > 0) {
        const index = products.value.findIndex(p => p.id === id);
        if (index !== -1) {
          products.value[index] = data[0];
        }
        return { success: true, data: data[0] };
      }
      return { success: false, message: 'Failed to update product' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  // CSV upload actions
  async function fetchUploads() {
    const authStore = useAuthStore();
    if (!authStore.companyId) return;
    
    loading.value.uploads = true;
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { uploads: uploadsApi } = useSupabaseApi();
      
      const { data, error } = await uploadsApi.list(
        { company_id: authStore.companyId }
      );
      
      if (error) throw error;
      if (data) {
        uploads.value = data;
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      loading.value.uploads = false;
    }
  }
  
  // Add missing updateUploadUrl function
  async function updateUploadUrl(id, newUrl) {
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { uploads: uploadsApi } = useSupabaseApi();
      
      const { data, error } = await uploadsApi.update(id, { file_url: newUrl });
      
      if (error) throw error;
      if (data && data.length > 0) {
        const index = uploads.value.findIndex(u => u.id === id);
        if (index !== -1) {
          uploads.value[index] = data[0];
        }
        return { success: true, data: data[0] };
      }
      return { success: false, message: 'Failed to update upload URL' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  // Add missing deleteProduct function
  async function deleteProduct(id) {
    try {
      const { useSupabaseApi } = await import('~/composables/useSupabaseApi');
      const { products: productsApi } = useSupabaseApi();
      
      const { data, error } = await productsApi.delete(id);
      
      if (error) throw error;
      
      // Remove the product from the local state
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value.splice(index, 1);
      }
      
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, message: error.message || 'Failed to delete product' };
    }
  }
  
  return {
    // State
    products,
    uploads,
    footprintReports,
    complianceScores,
    loading,
    filters,
    monthlyUsageData,
    
    // Getters
    totalProducts,
    totalPlasticWeight,
    averageRecyclability,
    materialTypeCounts,
    complianceScore,
    complianceStatus,
    complianceColor,
    filteredProducts,
    
    // Actions
    setFilter,
    clearFilters,
    fetchProducts,
    fetchProductsFromSupabase,
    fetchMonthlyUsageData,
    fetchComplianceScores,
    createProduct,
    addProduct,
    updateProduct,
    updateUploadUrl,
    deleteProduct,
    fetchUploads,
    
    // Helper functions
    formatWeight: (weight) => {
      if (weight >= 1000) {
        return `${(weight / 1000).toFixed(2)} kg`;
      }
      return `${Math.round(weight)} g`;
    },
    
    formatPercentage: (value) => {
      return `${Math.round(value)}%`;
    },
    
    recyclabilityColorClass: (percentage) => {
      if (percentage >= 70) return 'bg-success';
      if (percentage >= 40) return 'bg-warning';
      return 'bg-danger';
    }
  };
});