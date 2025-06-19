<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-forest mb-8">Frequently Asked Questions</h1>
    
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-forest mb-4">General Questions</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-lg">What is CircularIQ?</h3>
            <p class="mt-2 text-muted">
              CircularIQ is a sustainability platform that helps African businesses track plastic usage,
              ensure regulatory compliance, and build sustainability intelligence.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-lg">How does CircularIQ help with compliance?</h3>
            <p class="mt-2 text-muted">
              Our platform helps businesses meet local regulations like Kenya's EMCA and EPR laws by tracking
              plastic usage, generating regulatory reports, and providing insights for improvement.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-lg">Who can benefit from using CircularIQ?</h3>
            <p class="mt-2 text-muted">
              Any business that uses plastics in their operations or packaging can benefit from CircularIQ,
              particularly those in sectors with extended producer responsibility requirements.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-forest mb-4">Account & Billing</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-lg">How do I sign up for CircularIQ?</h3>
            <p class="mt-2 text-muted">
              You can sign up by clicking the "Sign Up" button on our website and following the registration process.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-lg">What pricing plans are available?</h3>
            <p class="mt-2 text-muted">
              We offer flexible pricing plans based on your business size and needs. Visit our pricing page
              for detailed information on each plan.
            </p>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <p class="text-muted">Have more questions? Contact our support team</p>
        <NuxtLink to="/contact" class="inline-block mt-2 text-primary hover:text-forest">Get in touch</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page metadata
useHead({
  title: 'FAQs - CircularIQ',
  meta: [
    { name: 'description', content: 'Frequently asked questions about CircularIQ sustainability platform.' }
  ]
});
</script>
