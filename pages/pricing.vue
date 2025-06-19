<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-forest text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p class="text-lg mb-8 opacity-90">
            Choose the right plan for your business needs. Scale up as your sustainability initiatives grow.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Pricing Tiers -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Starter Plan -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div class="p-8 text-center border-b border-gray-100">
              <h2 class="text-2xl font-semibold text-forest mb-2">Starter</h2>
              <p class="text-muted mb-6">For small businesses just beginning their sustainability journey</p>
              <div class="flex justify-center items-end mb-4">
                <span class="text-4xl font-bold text-forest">$99</span>
                <span class="text-muted ml-1">/month</span>
              </div>
              <p class="text-sm text-muted">billed annually or $119 monthly</p>
            </div>
            <div class="p-8 flex-grow">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 50 products</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Single user account</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic data collection tools</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Standard reporting</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email support</span>
                </li>
                <li class="flex items-start opacity-50">
                  <svg class="h-5 w-5 text-danger mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>API access</span>
                </li>
                <li class="flex items-start opacity-50">
                  <svg class="h-5 w-5 text-danger mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Recommendations engine</span>
                </li>
              </ul>
            </div>
            <div class="p-8 border-t border-gray-100">
              <NuxtLink to="/signup">
                <BaseButton variant="outline" fullWidth>Get Started</BaseButton>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Pro Plan (Featured) -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border-2 border-primary transform scale-105 md:scale-100 md:transform-none flex flex-col relative">
            <div class="absolute top-0 right-0 bg-primary text-white text-xs font-bold py-1 px-3 rounded-bl">
              MOST POPULAR
            </div>
            <div class="p-8 text-center border-b border-gray-100">
              <h2 class="text-2xl font-semibold text-forest mb-2">Pro</h2>
              <p class="text-muted mb-6">For growing businesses needing advanced tools</p>
              <div class="flex justify-center items-end mb-4">
                <span class="text-4xl font-bold text-forest">$249</span>
                <span class="text-muted ml-1">/month</span>
              </div>
              <p class="text-sm text-muted">billed annually or $299 monthly</p>
            </div>
            <div class="p-8 flex-grow">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 500 products</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5 user accounts</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced data collection tools</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PDF & CSV export</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email & chat support</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API access</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic recommendations engine</span>
                </li>
              </ul>
            </div>
            <div class="p-8 border-t border-gray-100">
              <NuxtLink to="/signup">
                <BaseButton variant="primary" fullWidth>Get Started</BaseButton>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Enterprise Plan -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div class="p-8 text-center border-b border-gray-100">
              <h2 class="text-2xl font-semibold text-forest mb-2">Enterprise</h2>
              <p class="text-muted mb-6">For larger organizations with complex needs</p>
              <div class="flex justify-center items-end mb-4">
                <span class="text-4xl font-bold text-forest">Custom</span>
              </div>
              <p class="text-sm text-muted">tailored to your specific requirements</p>
            </div>
            <div class="p-8 flex-grow">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited products</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited user accounts</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Enterprise data collection tools</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom reporting</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support with dedicated manager</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced API access</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced recommendations engine</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom branding</span>
                </li>
              </ul>
            </div>
            <div class="p-8 border-t border-gray-100">
              <NuxtLink to="/contact">
                <BaseButton variant="outline" fullWidth>Contact Sales</BaseButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQs Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-forest mb-12">Frequently Asked Questions</h2>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <!-- FAQ Item 1 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-xl font-semibold text-forest mb-3">Can I switch plans later?</h3>
            <p class="text-muted">
              Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing period. When downgrading, the new rate will take effect at the start of the next billing cycle.
            </p>
          </div>
          
          <!-- FAQ Item 2 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-xl font-semibold text-forest mb-3">Is there a free trial available?</h3>
            <p class="text-muted">
              Yes, we offer a 14-day free trial on all plans. No credit card is required to start your trial. During your trial, you'll have access to all features of your selected plan.
            </p>
          </div>
          
          <!-- FAQ Item 3 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-xl font-semibold text-forest mb-3">Do you offer discounts for nonprofits?</h3>
            <p class="text-muted">
              Yes, we offer special pricing for registered nonprofit organizations, educational institutions, and environmental NGOs. Contact our sales team for more information on our nonprofit discount program.
            </p>
          </div>
          
          <!-- FAQ Item 4 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-xl font-semibold text-forest mb-3">How is a "product" defined for plan limits?</h3>
            <p class="text-muted">
              A product is defined as a unique SKU or item in your inventory that contains plastic materials. Different variations of the same product (e.g., different sizes or colors) count as separate products if they have different material compositions.
            </p>
          </div>
          
          <!-- FAQ Item 5 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-xl font-semibold text-forest mb-3">What payment methods do you accept?</h3>
            <p class="text-muted">
              We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers for annual plans and enterprise customers. For customers in Kenya, we also support M-Pesa payments.
            </p>
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
  title: 'Pricing - CircularIQ',
  meta: [
    { name: 'description', content: 'View CircularIQ\'s pricing plans and choose the right option for your business sustainability needs.' }
  ]
});
</script>
