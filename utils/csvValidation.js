/**
 * CSV Validation utility for CircularIQ
 * Validates and processes CSV data for product imports
 * 
 * This module handles:
 * - Parsing and validating CSV files for product data import
 * - Data type conversion and normalization
 * - Environmental impact calculations
 * - Template generation for proper data formatting
 */

// Required fields for product CSV import
export const REQUIRED_FIELDS = ['name', 'product_type', 'material_type', 'weight_grams', 'recyclability_percentage'];

// Optional fields for product CSV import
export const OPTIONAL_FIELDS = ['sku', 'units_per_year', 'recycled_content', 'description', 'is_biodegradable', 'is_reusable'];

// All supported fields
export const ALL_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];

// Valid product types
export const VALID_PRODUCT_TYPES = ['packaging', 'container', 'bottle', 'wrapper', 'utensil', 'other'];

// Valid material types with recyclability details
export const MATERIAL_DETAILS = {
  'PET': { 
    fullName: 'Polyethylene Terephthalate',
    recyclable: true,
    commonUses: 'Bottles, food containers',
    recyclingCode: 1
  },
  'HDPE': { 
    fullName: 'High-Density Polyethylene',
    recyclable: true,
    commonUses: 'Milk jugs, detergent bottles',
    recyclingCode: 2
  },
  'PVC': { 
    fullName: 'Polyvinyl Chloride',
    recyclable: false,
    commonUses: 'Pipes, shower curtains, medical tubing',
    recyclingCode: 3,
    restrictions: 'Restricted in many regions'
  },
  'LDPE': { 
    fullName: 'Low-Density Polyethylene',
    recyclable: true,
    commonUses: 'Plastic bags, shrink wrap',
    recyclingCode: 4
  },
  'PP': { 
    fullName: 'Polypropylene',
    recyclable: true,
    commonUses: 'Food containers, bottle caps',
    recyclingCode: 5
  },
  'PS': { 
    fullName: 'Polystyrene',
    recyclable: false,
    commonUses: 'Foam cups, packing peanuts',
    recyclingCode: 6,
    restrictions: 'Being phased out in many regions'
  },
  'Other': { 
    fullName: 'Other Plastics',
    recyclable: false,
    commonUses: 'Various applications',
    recyclingCode: 7
  }
};

// Valid material types as array
export const VALID_MATERIAL_TYPES = Object.keys(MATERIAL_DETAILS);

/**
 * Validate a CSV file's content for product import
 * @param {Array<Array<string>>} csvData - Parsed CSV data as nested arrays
 * @returns {Object} - Validation result with success flag and errors/warnings
 */
export const validateCsvData = (csvData) => {
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
    processedData: [],
  };

  // Check if there's any data
  if (!csvData || csvData.length < 2) {
    result.isValid = false;
    result.errors.push('The file is empty or does not contain any data rows');
    return result;
  }

  // Parse headers (convert to lowercase for case-insensitive matching)
  const headers = csvData[0].map(h => h.toLowerCase().trim());

  // Check for required columns
  for (const field of REQUIRED_FIELDS) {
    if (!headers.includes(field)) {
      result.isValid = false;
      result.errors.push(`Missing required column: ${field}`);
    }
  }

  // Check for unknown columns
  const knownFields = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];
  headers.forEach(header => {
    if (!knownFields.includes(header)) {
      result.warnings.push(`Unknown column: ${header}`);
    }
  });

  // If missing required headers, don't continue validation
  if (!result.isValid) {
    return result;
  }

  // Process and validate data rows
  for (let i = 1; i < csvData.length; i++) {
    const row = csvData[i];
    if (!row.length || (row.length === 1 && !row[0].trim())) {
      // Skip empty rows
      continue;
    }

    if (row.length !== headers.length) {
      result.errors.push(`Row ${i}: Column count mismatch (expected ${headers.length}, got ${row.length})`);
      result.isValid = false;
      continue;
    }

    // Create object with column names as keys
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index]?.trim() || '';
    });

    // Validate required fields
    if (!rowData.name) {
      result.errors.push(`Row ${i}: Product name is required`);
      result.isValid = false;
    }

    // Validate product_type
    if (!rowData.product_type) {
      result.errors.push(`Row ${i}: Product type is required`);
      result.isValid = false;
    } else if (!VALID_PRODUCT_TYPES.includes(rowData.product_type.toLowerCase())) {
      result.errors.push(`Row ${i}: Invalid product type "${rowData.product_type}". Valid types: ${VALID_PRODUCT_TYPES.join(', ')}`);
      result.isValid = false;
    }

    // Validate material_type
    if (!rowData.material_type) {
      result.errors.push(`Row ${i}: Material type is required`);
      result.isValid = false;
    } else if (!VALID_MATERIAL_TYPES.includes(rowData.material_type)) {
      result.errors.push(`Row ${i}: Invalid material type "${rowData.material_type}". Valid types: ${VALID_MATERIAL_TYPES.join(', ')}`);
      result.isValid = false;
    }

    // Validate weight_grams
    if (!rowData.weight_grams) {
      result.errors.push(`Row ${i}: Weight is required`);
      result.isValid = false;
    } else {
      const weight = parseFloat(rowData.weight_grams);
      if (isNaN(weight) || weight <= 0) {
        result.errors.push(`Row ${i}: Weight must be a positive number`);
        result.isValid = false;
      }
    }

    // Validate recyclability_percentage
    if (!rowData.recyclability_percentage) {
      result.errors.push(`Row ${i}: Recyclability percentage is required`);
      result.isValid = false;
    } else {
      const recyclability = parseFloat(rowData.recyclability_percentage);
      if (isNaN(recyclability) || recyclability < 0 || recyclability > 100) {
        result.errors.push(`Row ${i}: Recyclability must be between 0 and 100`);
        result.isValid = false;
      }
    }

    // Validate optional fields if present
    if (rowData.units_per_year) {
      const units = parseFloat(rowData.units_per_year);
      if (isNaN(units) || units < 0) {
        result.errors.push(`Row ${i}: Units per year must be a positive number`);
        result.isValid = false;
      }
    }

    if (rowData.recycled_content) {
      const content = parseFloat(rowData.recycled_content);
      if (isNaN(content) || content < 0 || content > 100) {
        result.errors.push(`Row ${i}: Recycled content must be between 0 and 100`);
        result.isValid = false;
      }
    }

    // Convert boolean fields
    if (rowData.is_biodegradable !== undefined) {
      rowData.is_biodegradable = ['true', 'yes', '1'].includes(rowData.is_biodegradable.toLowerCase());
    }

    if (rowData.is_reusable !== undefined) {
      rowData.is_reusable = ['true', 'yes', '1'].includes(rowData.is_reusable.toLowerCase());
    }

    // Convert numeric fields
    const numericFields = ['weight_grams', 'recyclability_percentage', 'recycled_content', 'units_per_year'];
    numericFields.forEach(field => {
      if (rowData[field]) {
        rowData[field] = parseFloat(rowData[field]);
      }
    });

    // Add to processed data
    result.processedData.push(rowData);
  }

  // Check for data rows
  if (result.processedData.length === 0) {
    result.errors.push('No valid data rows found in the CSV');
    result.isValid = false;
  }

  return result;
};

/**
 * Parse a CSV string into a 2D array
 * @param {string} csvString - The CSV content as a string
 * @returns {Array<Array<string>>} - Parsed CSV data as nested arrays
 */
export const parseCSV = (csvString) => {
  // Handle different line endings
  const lines = csvString.replace(/\r\n/g, '\n').split('\n');
  const result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const row = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const nextChar = line[j + 1];
      
      if (char === '"' && !inQuotes) {
        inQuotes = true;
        continue;
      }
      
      if (char === '"' && inQuotes) {
        if (nextChar === '"') {
          // Handle escaped quotes
          currentValue += '"';
          j++; // Skip the next quote
        } else {
          inQuotes = false;
        }
        continue;
      }
      
      if (char === ',' && !inQuotes) {
        row.push(currentValue);
        currentValue = '';
        continue;
      }
      
      currentValue += char;
    }
    
    // Add the last value
    row.push(currentValue);
    result.push(row);
  }
  
  return result;
};

/**
 * Generate a CSV template string with headers and an example row
 * @returns {string} - CSV template as a string
 */
export const generateCsvTemplate = () => {
  const headers = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].join(',');
  const exampleRow = [
    'Water Bottle 500ml',                  // name
    'bottle',                              // product_type
    'PET',                                 // material_type
    '25',                                  // weight_grams
    '85',                                  // recyclability_percentage
    'WB-500-PET',                          // sku
    '10000',                               // units_per_year
    '15',                                  // recycled_content
    'Recyclable water bottle',             // description
    'false',                               // is_biodegradable
    'true'                                 // is_reusable
  ].join(',');
  
  return headers + '\n' + exampleRow;
};

/**
 * Calculate comprehensive environmental impact metrics based on material type and weight
 * @param {string} materialType - Type of plastic material
 * @param {number} weightGrams - Weight in grams
 * @param {number} unitsPerYear - Annual production/import units
 * @param {number} recyclabilityPercentage - Recyclability percentage (0-100)
 * @param {number} recycledContent - Recycled content percentage (0-100)
 * @returns {Object} - Environmental impact metrics
 */
export const calculateEnvironmentalImpact = (
  materialType, 
  weightGrams, 
  unitsPerYear = 1, 
  recyclabilityPercentage = 0, 
  recycledContent = 0
) => {
  // CO2 impact factors per gram of material (kg CO2e per gram)
  const CO2FactorsByMaterial = {
    'PET': 0.0025,
    'HDPE': 0.0018,
    'PVC': 0.0031,
    'LDPE': 0.002,
    'PP': 0.0019,
    'PS': 0.0035,
    'Other': 0.0027
  };
  
  // Water usage factors (liters per gram)
  const waterFactorsByMaterial = {
    'PET': 0.08,
    'HDPE': 0.04,
    'PVC': 0.09,
    'LDPE': 0.05,
    'PP': 0.04,
    'PS': 0.07,
    'Other': 0.06
  };
  
  // Decomposition times in years
  const decompositionTimes = {
    'PET': 450,
    'HDPE': 500,
    'PVC': 600,
    'LDPE': 350,
    'PP': 400,
    'PS': 500,
    'Other': 450
  };
  
  // Energy consumption for production (MJ per gram)
  const energyFactorsByMaterial = {
    'PET': 0.085,
    'HDPE': 0.08,
    'PVC': 0.09,
    'LDPE': 0.078,
    'PP': 0.075,
    'PS': 0.088,
    'Other': 0.082
  };
  
  // Calculate base impacts
  const factor = CO2FactorsByMaterial[materialType] || 0.0027;
  const waterFactor = waterFactorsByMaterial[materialType] || 0.06;
  const energyFactor = energyFactorsByMaterial[materialType] || 0.082;
  
  // Calculate per-unit impacts
  const co2ImpactPerUnit = weightGrams * factor; // kg CO2e
  const waterUsagePerUnit = weightGrams * waterFactor; // liters
  const energyUsagePerUnit = weightGrams * energyFactor; // MJ
  
  // Calculate annual impacts
  const annualWeight = (weightGrams * unitsPerYear) / 1000; // kg/year
  const annualCO2Impact = co2ImpactPerUnit * unitsPerYear; // kg CO2e/year
  const annualWaterUsage = waterUsagePerUnit * unitsPerYear; // liters/year
  const annualEnergyUsage = energyUsagePerUnit * unitsPerYear; // MJ/year
  
  // Calculate recycling-adjusted impacts (accounting for recyclability and recycled content)
  const recyclingAdjustmentFactor = 1 - ((recyclabilityPercentage / 100) * 0.7 + (recycledContent / 100) * 0.3);
  const adjustedCO2Impact = annualCO2Impact * recyclingAdjustmentFactor;
  
  // Calculate compliance score (0-100)
  const materialScore = MATERIAL_DETAILS[materialType].recyclable ? 30 : 10;
  const recyclabilityScore = Math.min(50, recyclabilityPercentage / 2); // Max 50 points
  const recycledContentScore = Math.min(20, recycledContent / 5); // Max 20 points
  const complianceScore = Math.round(materialScore + recyclabilityScore + recycledContentScore);
  
  // Recommendations based on impact analysis
  const recommendations = [];
  
  if (recyclabilityPercentage < 50) {
    recommendations.push('Consider redesigning for improved recyclability');
  }
  
  if (recycledContent < 20) {
    recommendations.push('Increase recycled content to improve sustainability profile');
  }
  
  if (!MATERIAL_DETAILS[materialType].recyclable) {
    recommendations.push(`Consider alternatives to ${materialType} that are more easily recyclable`);
  }
  
  // Return comprehensive impact metrics
  return {
    // Per unit metrics
    co2Impact: co2ImpactPerUnit, // kg CO2e
    waterUsage: waterUsagePerUnit, // liters
    energyUsage: energyUsagePerUnit, // MJ
    
    // Annual metrics
    annualWeight, // kg/year
    annualCO2Impact, // kg CO2e/year
    annualWaterUsage, // liters/year
    annualEnergyUsage, // MJ/year
    
    // Adjusted metrics
    adjustedCO2Impact, // kg CO2e/year (adjusted for recycling)
    
    // Material properties
    decompositionTime: decompositionTimes[materialType] || 450, // years
    recyclable: MATERIAL_DETAILS[materialType].recyclable,
    recyclingCode: MATERIAL_DETAILS[materialType].recyclingCode,
    
    // Compliance information
    complianceScore, // 0-100
    recommendations,
    
    // Reference data for reporting
    materialType,
    materialName: MATERIAL_DETAILS[materialType].fullName,
    weightGrams,
    unitsPerYear,
    recyclabilityPercentage,
    recycledContent
  };
};

/**
 * Process and enrich product data with calculated fields and validations
 * @param {Object} product - Raw product data
 * @returns {Object} - Enriched product data with calculated fields
 */
export const enrichProductData = (product) => {
  // Ensure numeric fields are properly converted
  const numericFields = ['weight_grams', 'units_per_year', 'recyclability_percentage', 'recycled_content'];
  numericFields.forEach(field => {
    if (product[field] !== undefined && product[field] !== null) {
      product[field] = typeof product[field] === 'string' 
        ? parseFloat(product[field]) 
        : product[field];
    }
  });
  
  // Ensure boolean fields are properly converted
  const booleanFields = ['is_biodegradable', 'is_reusable'];
  booleanFields.forEach(field => {
    if (product[field] !== undefined) {
      product[field] = typeof product[field] === 'string'
        ? ['true', 'yes', '1', 'y'].includes(product[field].toLowerCase())
        : !!product[field];
    }
  });
  
  // Calculate environmental impact metrics
  const impact = calculateEnvironmentalImpact(
    product.material_type,
    product.weight_grams || 0,
    product.units_per_year || 1,
    product.recyclability_percentage || 0,
    product.recycled_content || 0
  );
  
  // Add calculated fields to the product
  const enrichedProduct = {
    ...product,
    total_weight_kg: ((product.weight_grams || 0) * (product.units_per_year || 1)) / 1000,
    co2_impact: impact.co2Impact,
    annual_co2_impact: impact.annualCO2Impact,
    water_usage: impact.waterUsage,
    energy_usage: impact.energyUsage,
    compliance_score: impact.complianceScore,
    decomposition_time: impact.decompositionTime,
    material_recyclable: impact.recyclable,
    recycling_code: impact.recyclingCode
  };
  
  return enrichedProduct;
};

/**
 * Batch validate and process multiple products at once
 * @param {Array<Object>} products - Array of product data objects
 * @returns {Object} - Validation results and enriched data
 */
export const batchValidateProducts = (products) => {
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
    validProducts: [],
    invalidProducts: [],
    stats: {
      totalProducts: products.length,
      validProducts: 0,
      invalidProducts: 0,
      totalWeight: 0,
      totalCO2Impact: 0,
      materialDistribution: {}
    }
  };
  
  // Process each product
  products.forEach((product, index) => {
    const productErrors = [];
    
    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!product[field] && product[field] !== 0) {
        productErrors.push(`Missing required field: ${field}`);
      }
    }
    
    // Validate product_type
    if (product.product_type && !VALID_PRODUCT_TYPES.includes(product.product_type.toLowerCase())) {
      productErrors.push(`Invalid product type: ${product.product_type}. Valid types: ${VALID_PRODUCT_TYPES.join(', ')}`);
    }
    
    // Validate material_type
    if (product.material_type && !VALID_MATERIAL_TYPES.includes(product.material_type)) {
      productErrors.push(`Invalid material type: ${product.material_type}. Valid types: ${VALID_MATERIAL_TYPES.join(', ')}`);
    }
    
    // Validate numeric fields
    if (product.weight_grams) {
      const weight = parseFloat(product.weight_grams);
      if (isNaN(weight) || weight <= 0) {
        productErrors.push('Weight must be a positive number');
      }
    }
    
    if (product.recyclability_percentage) {
      const recyclability = parseFloat(product.recyclability_percentage);
      if (isNaN(recyclability) || recyclability < 0 || recyclability > 100) {
        productErrors.push('Recyclability must be between 0 and 100');
      }
    }
    
    if (product.recycled_content) {
      const content = parseFloat(product.recycled_content);
      if (isNaN(content) || content < 0 || content > 100) {
        productErrors.push('Recycled content must be between 0 and 100');
      }
    }
    
    // Process the product based on validation results
    if (productErrors.length > 0) {
      result.isValid = false;
      result.errors.push(`Product ${index + 1} (${product.name || 'unnamed'}): ${productErrors.join(', ')}`);
      result.invalidProducts.push({ 
        ...product, 
        validationErrors: productErrors 
      });
      result.stats.invalidProducts++;
    } else {
      // Enrich valid products with calculated fields
      const enrichedProduct = enrichProductData(product);
      result.validProducts.push(enrichedProduct);
      result.stats.validProducts++;
      
      // Update statistics
      result.stats.totalWeight += enrichedProduct.total_weight_kg || 0;
      result.stats.totalCO2Impact += enrichedProduct.annual_co2_impact || 0;
      
      // Update material distribution
      const material = enrichedProduct.material_type || 'Unknown';
      result.stats.materialDistribution[material] = (result.stats.materialDistribution[material] || 0) + 1;
    }
  });
  
  return result;
};

/**
 * Export products data as CSV string
 * @param {Array<Object>} products - Products data to export
 * @param {Array<string>} fields - Fields to include (default: all fields)
 * @returns {string} - CSV formatted string
 */
export const exportProductsToCSV = (products, fields = ALL_FIELDS) => {
  // Create CSV header
  const csvHeader = fields.join(',');
  
  // Create CSV rows
  const csvRows = products.map(product => {
    return fields.map(field => {
      const value = product[field];
      
      // Handle different data types
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'string') {
        // Escape quotes and wrap in quotes if contains comma or quotes
        if (value.includes(',') || value.includes('"')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      } else if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
      } else {
        return String(value);
      }
    }).join(',');
  });
  
  // Combine header and rows
  return [csvHeader, ...csvRows].join('\n');
};