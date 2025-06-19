<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-background py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-forest mb-6">
              Smart Plastic Management for African Businesses
            </h1>
            <p class="text-lg text-muted mb-8">
              Track plastic usage, ensure regulatory compliance, and build sustainability intelligence with our comprehensive platform.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <NuxtLink to="/signup">
                <BaseButton size="lg" variant="primary">
                  Get Started Free
                </BaseButton>
              </NuxtLink>
              <NuxtLink to="/contact">
                <BaseButton size="lg" variant="outline">
                  Contact Sales
                </BaseButton>
              </NuxtLink>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <img src="/visual-reference/CircularIQ.png" alt="CircularIQ Dashboard Preview" class="rounded-lg shadow-sm w-full" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Overview -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-forest mb-4">Built for Africa's Sustainability Journey</h2>
          <p class="text-lg text-muted max-w-3xl mx-auto">
            Our platform helps businesses understand their plastic footprint, comply with regulations like Kenya's EMCA and EPR laws, and take meaningful steps toward circularity.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="#F4F4F4" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-forest mb-3">Data Collection & Validation</h3>
            <p class="text-muted">
              Easily input and validate your product SKU details, including material types, weights, and recyclability metrics through manual entry or bulk CSV uploads.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="#F4F4F4" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-forest mb-3">Compliance & Circularity</h3>
            <p class="text-muted">
              Get real-time assessment of your compliance with local regulations and calculate your organization's circularity score based on product data.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="#F4F4F4" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-forest mb-3">Smart Analytics & Reports</h3>
            <p class="text-muted">
              Access comprehensive dashboards and generate ready-to-submit reports for regulatory bodies with detailed insights into your sustainability metrics.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Compliance Callout -->
    <section class="bg-forest text-white py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Stay Ahead of Regulatory Changes</h2>
            <p class="mb-8 text-lg opacity-90">
              Kenya's EMCA and EPR laws are becoming stricter. Our platform automatically updates with new regulatory requirements, ensuring your business always stays compliant.
            </p>
            <ul class="space-y-4">
              <li class="flex">
                <span class="mr-2 text-accent">✓</span>
                <span>Real-time compliance scoring for each product</span>
              </li>
              <li class="flex">
                <span class="mr-2 text-accent">✓</span>
                <span>Automated alerts for upcoming deadlines</span>
              </li>
              <li class="flex">
                <span class="mr-2 text-accent">✓</span>
                <span>Customized reports for NEMA submissions</span>
              </li>
            </ul>
          </div>
          <div>
            <BaseCard elevated>
              <div class="flex flex-col items-center text-center p-4">
                <div class="w-24 h-24 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
                  <span class="text-4xl text-background">85%</span>
                </div>
                <h3 class="text-xl font-semibold text-forest">Average Compliance Score</h3>
                <p class="text-muted mt-2">for businesses using CircularIQ</p>
              </div>
              <template #footer>
                <div class="text-center">
                  <NuxtLink to="/features">
                    <BaseButton variant="primary">Learn More</BaseButton>
                  </NuxtLink>
                </div>
              </template>
            </BaseCard>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-forest mb-4">Trusted by Leading Businesses</h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            See how businesses across Africa are improving their sustainability outcomes with CircularIQ.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <p class="text-muted mb-6">
              "CircularIQ has transformed how we manage our plastic usage. We've improved our compliance score from 62% to 91% in just 6 months."
            </p>
            <div class="flex items-center">
              <div class="bg-accent rounded-full w-10 h-10 flex items-center justify-center text-forest font-bold">
                KL
              </div>
              <div class="ml-3">
                <p class="font-medium text-forest">Kariuki Levels</p>
                <p class="text-sm text-muted">Sustainability Manager, CPG Corp</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <p class="text-muted mb-6">
              "The automated reports have saved our team countless hours. Now we can focus on implementing sustainability initiatives instead of compiling data."
            </p>
            <div class="flex items-center">
              <div class="bg-accent rounded-full w-10 h-10 flex items-center justify-center text-forest font-bold">
                AN
              </div>
              <div class="ml-3">
                <p class="font-medium text-forest">Amina Ngugi</p>
                <p class="text-sm text-muted">Operations Director, EcoPackaging</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <p class="text-muted mb-6">
              "The supplier matching feature helped us find local recyclers for our PET waste, creating a circular value chain for our business."
            </p>
            <div class="flex items-center">
              <div class="bg-accent rounded-full w-10 h-10 flex items-center justify-center text-forest font-bold">
                JM
              </div>
              <div class="ml-3">
                <p class="font-medium text-forest">James Mwangi</p>
                <p class="text-sm text-muted">CEO, Nairobi Beverages</p>
              </div>
            </div>
          </div>
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
  title: 'CircularIQ - Plastic Management & Sustainability Platform',
  meta: [
    { name: 'description', content: 'Track plastic usage, ensure regulatory compliance, and build sustainability intelligence for your African business with CircularIQ.' }
  ]
});
</script>
