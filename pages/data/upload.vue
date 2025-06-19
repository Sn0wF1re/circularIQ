<!-- filepath: /home/clinton/repos/circularIQ/pages/data/upload.vue -->
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
          <h1 class="text-2xl font-bold text-forest">Upload Product Data</h1>
        </div>
        <p class="text-muted">Bulk upload your products using CSV format</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div class="lg:col-span-8">
          <BaseCard title="CSV File Upload" elevated>
            <div class="space-y-6">
              <!-- Upload Instructions -->
              <div class="bg-info bg-opacity-10 p-4 rounded-md text-info">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="font-medium">CSV File Requirements</p>
                    <ul class="list-disc pl-5 mt-1 text-sm">
                      <li>File must be in CSV format with headers</li>
                      <li>Required columns: name, product_type, material_type, weight_grams, recyclability_percentage</li>
                      <li>Optional columns: sku, units_per_year, recycled_content, description, is_biodegradable, is_reusable</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Upload Area -->
              <div 
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                :class="{'border-primary': isDragging}"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="onFileDrop"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                
                <h3 class="text-lg font-medium mb-2">Drag & Drop CSV File</h3>
                <p class="text-muted mb-4">or</p>
                
                <label class="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer">
                  Browse Files
                  <input 
                    type="file"
                    accept=".csv"
                    class="hidden"
                    @change="onFileSelect"
                  />
                </label>
                
                <p v-if="selectedFile" class="mt-4 text-forest">
                  Selected: <span class="font-medium">{{ selectedFile.name }}</span> 
                  ({{ formatFileSize(selectedFile.size) }})
                </p>
              </div>

              <!-- File Preview -->
              <div v-if="filePreview.length" class="border rounded-md overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th 
                        v-for="(header, i) in filePreview[0]" 
                        :key="i"
                        class="px-4 py-3 bg-surface text-left text-xs font-medium text-muted uppercase tracking-wider"
                      >
                        {{ header }}
                        <span v-if="requiredFields.includes(header.toLowerCase())" class="text-danger">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(row, i) in filePreview.slice(1, 6)" :key="i">
                      <td 
                        v-for="(cell, j) in row" 
                        :key="j"
                        class="px-4 py-2 whitespace-nowrap text-sm"
                      >
                        {{ cell }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div v-if="filePreview.length > 6" class="p-2 bg-surface text-center text-xs text-muted">
                  Showing 5 of {{ filePreview.length - 1 }} rows
                </div>
              </div>

              <!-- Validation Messages -->
              <div v-if="validationErrors.length" class="bg-danger bg-opacity-10 p-4 rounded-md text-danger mb-4">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p class="font-medium">Validation Errors</p>
                    <ul class="list-disc pl-5 mt-1 text-sm">
                      <li v-for="(error, i) in validationErrors" :key="i">{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Data Summary -->
              <div v-if="dataSummary.totalProducts > 0" class="bg-success bg-opacity-10 p-4 rounded-md text-forest mb-4">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <p class="font-medium">File Summary</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p class="text-sm flex justify-between">
                          <span>Products:</span>
                          <span class="font-medium">{{ dataSummary.totalProducts }}</span>
                        </p>
                        <p class="text-sm flex justify-between">
                          <span>Total Weight:</span>
                          <span class="font-medium">{{ dataSummary.totalWeight.toFixed(2) }} kg</span>
                        </p>
                        <p class="text-sm flex justify-between">
                          <span>CO₂ Impact:</span>
                          <span class="font-medium">{{ dataSummary.co2Impact.toFixed(2) }} kg CO₂e</span>
                        </p>
                      </div>
                      <div>
                        <p class="text-sm mb-1">Material Distribution:</p>
                        <div class="space-y-1">
                          <div 
                            v-for="(count, material) in dataSummary.materialDistribution" 
                            :key="material"
                            class="flex items-center text-xs"
                          >
                            <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                class="h-2 rounded-full bg-forest"
                                :style="`width: ${(count / dataSummary.totalProducts) * 100}%`"
                              ></div>
                            </div>
                            <span>{{ material }}: {{ count }}</span>
                          </div>
                        </div>
                      </div>
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
                  type="button" 
                  variant="secondary" 
                  @click="downloadTemplate"
                  icon="download"
                >
                  Download Template
                </BaseButton>
                <BaseButton 
                  type="button" 
                  variant="primary"
                  :loading="uploading"
                  :disabled="!selectedFile || validationErrors.length > 0"
                  @click="uploadFile"
                >
                  Upload File
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
        
        <div class="lg:col-span-4">
          <BaseCard title="Template Format" elevated>
            <div class="space-y-4">
              <h3 class="font-medium text-forest">Required Fields</h3>
              <div class="space-y-2">
                <div v-for="(field, i) in requiredFields" :key="i" class="flex items-center justify-between">
                  <div>
                    <span class="font-medium">{{ field }}</span>
                  </div>
                  <Badge variant="success">Required</Badge>
                </div>
              </div>
              
              <h3 class="font-medium text-forest pt-4">Optional Fields</h3>
              <div class="space-y-2">
                <div v-for="(field, i) in optionalFields" :key="i" class="flex items-center justify-between">
                  <div>
                    <span class="font-medium">{{ field }}</span>
                  </div>
                  <Badge variant="info">Optional</Badge>
                </div>
              </div>
              
              <div class="pt-4 border-t mt-4">
                <h3 class="font-medium text-forest mb-2">Example Values</h3>
                <div class="space-y-2 text-sm text-muted">
                  <p><span class="font-medium">product_type:</span> packaging, container, bottle, wrapper, utensil, other</p>
                  <p><span class="font-medium">material_type:</span> PET, HDPE, PVC, LDPE, PP, PS, Other</p>
                  <p><span class="font-medium">recyclability_percentage:</span> 0-100 (numeric)</p>
                  <p><span class="font-medium">is_biodegradable:</span> true/false (boolean)</p>
                  <p><span class="font-medium">is_reusable:</span> true/false (boolean)</p>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Recent Uploads -->
          <BaseCard title="Recent Uploads" class="mt-6" elevated>
            <div v-if="loading" class="py-4 text-center">
              <div class="loader inline-block"></div>
            </div>
            
            <div v-else-if="!uploads.length" class="py-4 text-center text-muted text-sm">
              No recent uploads
            </div>
            
            <div v-else class="space-y-3">
              <div 
                v-for="upload in uploads.slice(0, 5)" 
                :key="upload.id"
                class="flex items-center justify-between p-3 bg-surface rounded-md"
              >
                <div class="flex-1">
                  <p class="font-medium text-sm truncate max-w-[180px]">{{ upload.filename }}</p>
                  <p class="text-xs text-muted">{{ formatDate(upload.created_at) }}</p>
                  <div class="flex items-center mt-1">
                    <span class="text-xs text-muted mr-2">{{ upload.product_count }} products</span>
                    <span class="text-xs text-muted">{{ formatFileSize(upload.file_size) }}</span>
                  </div>
                </div>
                <div class="flex flex-col items-end ml-2">
                  <Badge :variant="upload.status === 'success' ? 'success' : upload.status === 'error' ? 'danger' : 'warning'">
                    {{ upload.status }}
                  </Badge>
                  <button 
                    v-if="upload.file_url" 
                    class="text-xs text-primary mt-1 hover:underline"
                    @click="openFileUrl(upload)"
                  >
                    View File
                  </button>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePlasticDataStore } from '~/stores/plasticData';
import { useAuthStore } from '~/stores/auth';
import {
  parseCSV,
  validateCsvData,
  batchValidateProducts,
  enrichProductData,
  generateCsvTemplate,
  REQUIRED_FIELDS,
  OPTIONAL_FIELDS
} from '~/utils/csvValidation';

definePageMeta({
  layout: false,
});

const router = useRouter();
const plasticDataStore = usePlasticDataStore();
const authStore = useAuthStore();

// Local state
const selectedFile = ref(null);
const filePreview = ref([]);
const validationErrors = ref([]);
const isDragging = ref(false);
const uploading = ref(false);
const loading = ref(false);
const dataSummary = ref({
  totalProducts: 0,
  validProducts: 0,
  totalWeight: 0,
  co2Impact: 0,
  materialDistribution: {}
});

// Get uploads from store
const { uploads } = plasticDataStore;

// Get field definitions from our validation utility
const requiredFields = REQUIRED_FIELDS;
const optionalFields = OPTIONAL_FIELDS;

// Fetch uploads on component mount
onMounted(async () => {
  loading.value = true;
  await plasticDataStore.fetchUploads();
  loading.value = false;
});

// Handle file selection from the file input
function onFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
}

// Handle file drop event
function onFileDrop(event) {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type === 'text/csv') {
    processFile(file);
  } else {
    validationErrors.value = ['Please select a valid CSV file'];
  }
}

// Process the selected file
function processFile(file) {
  selectedFile.value = file;
  validationErrors.value = [];
  
  // Read file as text
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const { parseCSV, validateCsvData, batchValidateProducts } = useCSVValidation();
      const csvContent = e.target.result;
      
      // Parse CSV to array
      const parsedData = parseCSV(csvContent);
      
      // Store for preview
      filePreview.value = parsedData;
      
      // First validate CSV structure
      const structureValidation = validateCsvData(parsedData);
      
      if (!structureValidation.isValid) {
        validationErrors.value = structureValidation.errors;
        
        // Also show warnings if there are any
        if (structureValidation.warnings.length) {
          structureValidation.warnings.forEach(warning => {
            validationErrors.value.push(`Warning: ${warning}`);
          });
        }
        
        // Import notification system for error messages
        const { useNotification } = await import('~/composables/useNotification');
        const { error } = useNotification();
        error('Validation Failed', 'The CSV file has structural errors. Please check the format.');
        
        return;
      }
      
      // Now perform detailed validation on the actual data rows
      const headers = parsedData[0];
      const dataRows = parsedData.slice(1).map(row => {
        const product = {};
        headers.forEach((header, index) => {
          product[header.toLowerCase()] = row[index];
        });
        return product;
      });
      
      // Batch validate the products for more comprehensive checks
      const detailedValidation = batchValidateProducts(dataRows);
      
      // If we have validation errors, show them
      if (!detailedValidation.isValid) {
        validationErrors.value = detailedValidation.errors;
        
        // Calculate some statistics to show
        const errorCount = detailedValidation.errors.length;
        const rowCount = dataRows.length;
        const validRowCount = detailedValidation.validProducts.length;
        
        // Group errors by type for better presentation
        const errorTypes = {};
        detailedValidation.errors.forEach(err => {
          const match = err.match(/^Product \d+ \(.*?\): (.*)/);
          if (match) {
            const errorMsg = match[1];
            errorTypes[errorMsg] = (errorTypes[errorMsg] || 0) + 1;
          }
        });
        
        // Add summary information
        validationErrors.unshift(`Found ${errorCount} errors in ${rowCount - validRowCount} of ${rowCount} rows.`);
        
        // Import notification system for warning messages
        const { useNotification } = await import('~/composables/useNotification');
        const { warning } = useNotification();
        warning(
          'Data Validation Issues', 
          `${validRowCount} of ${rowCount} rows are valid. Please fix the errors to proceed.`
        );
        
        return;
      }
      
      // Update data summary regardless of warnings
      dataSummary.value = {
        totalProducts: detailedValidation.stats.totalProducts,
        validProducts: detailedValidation.stats.validProducts,
        totalWeight: detailedValidation.stats.totalWeight,
        co2Impact: detailedValidation.stats.totalCO2Impact,
        materialDistribution: detailedValidation.stats.materialDistribution
      };
      
      // Check for warnings in the detailed validation
      if (detailedValidation.warnings.length > 0) {
        detailedValidation.warnings.forEach(warning => {
          validationErrors.value.push(`Warning: ${warning}`);
        });
        
        // Import notification system
        const { useNotification } = await import('~/composables/useNotification');
        const { warning, success } = useNotification();
        
        warning(
          'Minor Issues Found',
          `${detailedValidation.warnings.length} warnings found, but file can still be processed.`
        );
        
        success(
          'Validation Passed', 
          `${detailedValidation.stats.validProducts} products ready for upload.`
        );
      } else {
        // Import notification system
        const { useNotification } = await import('~/composables/useNotification');
        const { success } = useNotification();
        
        success(
          'Validation Passed', 
          `${detailedValidation.stats.validProducts} products ready for upload.`
        );
      }
    } catch (error) {
      console.error('Error parsing CSV:', error);
      validationErrors.value = ['Could not parse the CSV file. Please check the format.'];
      
      // Show error notification
      const { useNotification } = await import('~/composables/useNotification');
      const { error: errorNotification } = useNotification();
      errorNotification('Parse Error', 'Could not parse the CSV file. Please check the format.');
    }
  };
  
  reader.onerror = async () => {
    validationErrors.value = ['Error reading the file. Please try again.'];
    
    // Show error notification
    const { useNotification } = await import('~/composables/useNotification');
    const { error } = useNotification();
    error('File Error', 'Error reading the file. Please try again.');
  };
  
  reader.readAsText(file);
}

// Utility composable for CSV validation functions
const useCSVValidation = () => {
  
  return {
    parseCSV,
    validateCsvData,
    batchValidateProducts,
    enrichProductData,
    generateCsvTemplate,
    REQUIRED_FIELDS,
    OPTIONAL_FIELDS
  };
};

// Upload the selected file
async function uploadFile() {
  if (!selectedFile.value || validationErrors.value.length > 0) {
    return;
  }
  
  uploading.value = true;
  
  try {
    // Import notification system
    const { useNotification } = await import('~/composables/useNotification');
    const { success, error, warning, info } = useNotification();
    
    // Use our enhanced batch validation to get more comprehensive results
    const { parseCSV, batchValidateProducts } = useCSVValidation();
    
    // Parse the CSV data if not already parsed
    const csvData = filePreview.value.length ? filePreview.value : parseCSV(await readFileAsText(selectedFile.value));
    
    // Get the data excluding header row
    const headers = csvData[0];
    const dataRows = csvData.slice(1).map(row => {
      const product = {};
      headers.forEach((header, index) => {
        product[header.toLowerCase()] = row[index];
      });
      return product;
    });
    
    // Batch validate the products
    const validationResult = batchValidateProducts(dataRows);
    
    if (!validationResult.isValid || validationResult.validProducts.length === 0) {
      validationErrors.value = validationResult.errors;
      error('Validation Failed', `Failed to validate CSV data: ${validationResult.errors.length} errors found`);
      uploading.value = false;
      return;
    }
    
    if (validationResult.warnings.length > 0) {
      warning('Validation Warnings', `${validationResult.warnings.length} warnings found, but file can still be processed`);
    }
    
    info('Processing', `Processing ${validationResult.validProducts.length} products. This may take a moment...`);
    
    // First, upload the file to Supabase Storage
    const { useSupabaseApi: getSupabaseApi } = await import('~/composables/useSupabaseApi');
    const { storage, uploads: storageUploads } = getSupabaseApi();
    
    // Generate a unique filename to avoid collisions
    const timestamp = new Date().getTime();
    const fileExtension = selectedFile.value.name.split('.').pop();
    const uniqueFileName = `${authStore.companyId}/${timestamp}-${selectedFile.value.name}`;
    const storagePath = `csv-uploads/${uniqueFileName}`;
    
    // Read the file content
    const fileContent = await readFileAsText(selectedFile.value);
    
    // Create the product-uploads bucket if it doesn't exist yet
    const bucketResult = await storage.createBucket('product-uploads', false);
    
    if (bucketResult && bucketResult.error && !bucketResult.error.message.includes('already exists')) {
      throw new Error(`Failed to create storage bucket: ${bucketResult.error.message}`);
    }
    
    // Upload the file to storage
    const uploadResult = await storage.upload('product-uploads', storagePath, fileContent, {
      contentType: 'text/csv'
    });
    
    if (uploadResult.error) {
      throw new Error(`Failed to upload file: ${uploadResult.error.message}`);
    }
    
    // Get a signed URL for the file (valid for 1 hour)
    const urlResult = await storage.getSignedUrl('product-uploads', storagePath, 3600);
    
    if (urlResult.error) {
      throw new Error(`Failed to generate file URL: ${urlResult.error.message}`);
    }
    
    // Create upload record with file reference
    const uploadData = {
      filename: selectedFile.value.name,
      file_size: selectedFile.value.size,
      status: 'processing',
      product_count: validationResult.validProducts.length,
      company_id: authStore.companyId,
      created_at: new Date().toISOString(),
      file_path: storagePath,
      file_url: urlResult.data.signedUrl,
      metadata: {
        stats: validationResult.stats,
        materialDistribution: validationResult.stats.materialDistribution,
        totalWeight: validationResult.stats.totalWeight,
        totalCO2Impact: validationResult.stats.totalCO2Impact
      }
    };
    
    // Create upload record
    const response = await storageUploads.create(uploadData);
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    // Add company_id to each product and ensure they're enriched with calculated fields
    const { enrichProductData } = useCSVValidation();
    const products = validationResult.validProducts.map(product => ({
      ...enrichProductData(product),
      company_id: authStore.companyId
    }));
    
    // Batch create products (in a real app, this would be handled by a server function)
    const { products: productsApi } = getSupabaseMcp();
    const batch = 50;
    let createdCount = 0;
    
    for (let i = 0; i < products.length; i += batch) {
      const chunk = products.slice(i, i + batch);
      await Promise.all(chunk.map(product => productsApi.create(product)));
      createdCount += chunk.length;
      
      // Update progress if many products
      if (products.length > 100 && i % 100 === 0) {
        info('Upload Progress', `Processed ${createdCount} of ${products.length} products...`);
      }
    }
    
    // Update upload status
    const uploadId = response.data[0].id;
    await storageUploads.update(uploadId, { status: 'success' });
    
    // Refresh data
    await Promise.all([
      plasticDataStore.fetchProducts(),
      plasticDataStore.fetchUploads()
    ]);
    
    // Show success notification
    success(
      'Upload Complete', 
      `Successfully processed ${products.length} products with a total weight of ${validationResult.stats.totalWeight.toFixed(2)} kg`
    );
    
    // Navigate back to data list
    router.push('/data');
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Show error notification
    const { useNotification } = await import('~/composables/useNotification');
    const { error: errorNotification } = useNotification();
    errorNotification('Upload Failed', `Error uploading file: ${error.message}`);
    
    validationErrors.value = ['Error uploading file: ' + error.message];
  } finally {
    uploading.value = false;
  }
}

// Helper function to read file as text
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
  });
}

// Download CSV template
async function downloadTemplate() {
  const { generateCsvTemplate } = useCSVValidation();
  const csv = generateCsvTemplate();
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'product_template.csv';
  a.click();
  URL.revokeObjectURL(url);
  
  // Show notification that template was downloaded
  const { useNotification } = await import('~/composables/useNotification');
  const { info } = useNotification();
  info(
    'Template Downloaded', 
    'CSV template has been downloaded. Use it as a guide for formatting your product data.'
  );
}

// Format file size in human-readable format
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Format date in human-readable format
function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Navigate back to data list
function navigateBack() {
  router.push('/data');
}

// Open file URL in a new tab or get a fresh signed URL if expired
async function openFileUrl(upload) {
  try {
    if (!upload.file_path) {
      throw new Error('File path not found');
    }
    
    // Check if URL exists and isn't expired
    if (upload.file_url && new URL(upload.file_url).searchParams.get('token')) {
      window.open(upload.file_url, '_blank');
    } else {
      // Get a fresh signed URL
      const { useSupabaseApi: getSupabaseForUrl } = await import('~/composables/useSupabaseApi');
      const { storage: fileStorage } = getSupabaseForUrl();
      
      const urlResult = await fileStorage.getSignedUrl('product-uploads', upload.file_path, 3600);
      
      if (urlResult.error) {
        throw new Error(urlResult.error.message);
      }
      
      // Update the URL in the store
      await plasticDataStore.updateUploadUrl(upload.id, urlResult.data.signedUrl);
      
      // Open the fresh URL
      window.open(urlResult.data.signedUrl, '_blank');
    }
  } catch (error) {
    console.error('Error opening file:', error);
    
    // Show error notification
    const { useNotification } = await import('~/composables/useNotification');
    const { error: errorNotification } = useNotification();
    errorNotification('File Error', 'Could not access the file. It may have been deleted or moved.');
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
