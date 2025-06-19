<template>
    <section class="bg-primary bg-opacity-10 py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-surface mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-surface max-w-2xl mx-auto mb-8">
          Join hundreds of forward-thinking businesses using CircularIQ to track, report, and improve their plastic footprint.
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NuxtLink to="/signup">
            <BaseButton size="lg" variant="primary" class="bg-primary-hover">
              Sign Up Now
            </BaseButton>
          </NuxtLink>
          <NuxtLink to="/contact">
            <BaseButton size="lg" variant="primary" class="bg-primary-hover">
              Contact Sales
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </section>
</template>