<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-forest text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-6">Comprehensive Features for Plastic Management</h1>
          <p class="text-lg mb-8 opacity-90">
            CircularIQ provides all the tools you need to track, analyze, and improve your plastic footprint,
            while ensuring compliance with local regulations.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Features Grid -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1: Data Collection -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Data Collection & Validation</h3>
              <p class="text-muted mb-4">
                Easily collect and validate your product data with multiple input methods.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Manual data entry with real-time validation</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bulk CSV imports with error checking</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Industry-specific templates</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Material and weight auto-calculation</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Feature 2: Plastic Footprint Calculator -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Plastic Footprint Calculator</h3>
              <p class="text-muted mb-4">
                Accurately measure and analyze your plastic usage with our comprehensive calculator.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Total plastic use by weight and volume</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly and annual plastic intensity</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CO2 equivalent conversion</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Material breakdown analysis</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Feature 3: Compliance Engine -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Compliance & Circularity Engine</h3>
              <p class="text-muted mb-4">
                Stay compliant with local regulations and track your circular economy metrics.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kenya EMCA & EPR readiness scoring</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Non-compliant product flagging</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive circularity score</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated compliance alerts</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Feature 4: Dashboard & Reports -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Dashboards & Reporting</h3>
              <p class="text-muted mb-4">
                Visualize your data and generate detailed reports for stakeholders.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interactive KPI cards and graphs</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CSV and PDF report generation</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Trend tracking and comparison</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>NEMA-ready export formats</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Feature 5: Recommendations -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Recommendations Engine</h3>
              <p class="text-muted mb-4">
                Receive AI-powered suggestions to improve your sustainability metrics.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Product-specific improvement ideas</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Budget and ROI estimates</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Implementation difficulty ratings</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Material alternatives database</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Feature 6: Team Management -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="h-48 bg-surface bg-opacity-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-forest mb-3">Multi-Tenant & Roles</h3>
              <p class="text-muted mb-4">
                Manage your team with customizable roles and permissions.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Admin, Analyst, and Viewer roles</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email invitations</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Activity logging</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Branch/location management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Comparison Table Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto mb-12">
          <h2 class="text-3xl font-bold text-forest mb-4">Choose the Right Plan for Your Business</h2>
          <p class="text-lg text-muted">
            Our flexible pricing options are designed to meet the needs of businesses of all sizes,
            from small enterprises to large corporations.
          </p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-forest text-white">
                <th class="p-4 text-left">Feature</th>
                <th class="p-4 text-center">Starter</th>
                <th class="p-4 text-center">Pro</th>
                <th class="p-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-4 font-medium">Data Collection</td>
                <td class="p-4 text-center">Basic</td>
                <td class="p-4 text-center">Advanced</td>
                <td class="p-4 text-center">Enterprise</td>
              </tr>
              <tr class="border-b border-gray-200 bg-gray-50">
                <td class="p-4 font-medium">Products (SKUs)</td>
                <td class="p-4 text-center">Up to 50</td>
                <td class="p-4 text-center">Up to 500</td>
                <td class="p-4 text-center">Unlimited</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-4 font-medium">User Accounts</td>
                <td class="p-4 text-center">1</td>
                <td class="p-4 text-center">5</td>
                <td class="p-4 text-center">Unlimited</td>
              </tr>
              <tr class="border-b border-gray-200 bg-gray-50">
                <td class="p-4 font-medium">Reports</td>
                <td class="p-4 text-center">Basic</td>
                <td class="p-4 text-center">
                  <span class="text-success">✓</span> PDF & CSV
                </td>
                <td class="p-4 text-center">
                  <span class="text-success">✓</span> Custom
                </td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-4 font-medium">API Access</td>
                <td class="p-4 text-center">
                  <span class="text-danger">✗</span>
                </td>
                <td class="p-4 text-center">
                  <span class="text-success">✓</span>
                </td>
                <td class="p-4 text-center">
                  <span class="text-success">✓</span>
                </td>
              </tr>
              <tr class="border-b border-gray-200 bg-gray-50">
                <td class="p-4 font-medium">Recommendations Engine</td>
                <td class="p-4 text-center">
                  <span class="text-danger">✗</span>
                </td>
                <td class="p-4 text-center">Basic</td>
                <td class="p-4 text-center">Advanced</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-4 font-medium">Custom Branding</td>
                <td class="p-4 text-center">
                  <span class="text-danger">✗</span>
                </td>
                <td class="p-4 text-center">
                  <span class="text-danger">✗</span>
                </td>
                <td class="p-4 text-center">
                  <span class="text-success">✓</span>
                </td>
              </tr>
              <tr class="border-b border-gray-200 bg-gray-50">
                <td class="p-4 font-medium">Dedicated Support</td>
                <td class="p-4 text-center">Email</td>
                <td class="p-4 text-center">Email & Chat</td>
                <td class="p-4 text-center">Priority Support</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="text-center mt-10">
          <NuxtLink to="/pricing">
            <BaseButton size="lg" variant="primary">
              View Detailed Pricing
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <CtaSection />
  </div>
</template>

<script setup>
// Set page metadata
useHead({
  title: 'Features - CircularIQ',
  meta: [
    { name: 'description', content: 'Discover CircularIQ\'s comprehensive features for plastic management, compliance tracking, and sustainability reporting.' }
  ]
});
</script>
