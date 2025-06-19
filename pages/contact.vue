<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-forest text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-6">Contact Us</h1>
          <p class="text-lg mb-8 opacity-90">
            Have questions about CircularIQ? We're here to help you on your sustainability journey.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact Form Section -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-bold text-forest mb-6">Get In Touch</h2>
            <p class="text-lg text-muted mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Alert for success/error messages -->
              <div v-if="formStatus.message" 
                  :class="`p-4 rounded-md ${formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`">
                {{ formStatus.message }}
              </div>
              
              <!-- Full Name -->
              <FormInput
                v-model="form.name"
                type="text"
                label="Full Name"
                :error="errors.name"
                required
              />
              
              <!-- Email -->
              <FormInput
                v-model="form.email"
                type="email"
                label="Email Address"
                :error="errors.email"
                required
              />
              
              <!-- Company -->
              <FormInput
                v-model="form.company"
                type="text"
                label="Company Name"
                :error="errors.company"
                required
              />
              
              <!-- Subject -->
              <div>
                <label for="subject" class="block text-sm font-medium text-forest mb-1">Subject</label>
                <select 
                  v-model="form.subject"
                  id="subject"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="" disabled>Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="demo">Request a Demo</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
                <p v-if="errors.subject" class="mt-1 text-sm text-danger">{{ errors.subject }}</p>
              </div>
              
              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-forest mb-1">Message</label>
                <textarea 
                  v-model="form.message"
                  id="message"
                  rows="5"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-sm text-danger">{{ errors.message }}</p>
              </div>
              
              <BaseButton type="submit" variant="primary" size="lg" class="w-full" :loading="loading">
                Send Message
              </BaseButton>
            </form>
          </div>
          
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <h3 class="text-2xl font-semibold text-forest mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-forest">Our Location</h4>
                  <p class="text-muted mt-1">Kilimani Business Center<br/>Nairobi, Kenya</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-forest">Email Us</h4>
                  <p class="text-muted mt-1">info@circulariq.com</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-forest">Call Us</h4>
                  <p class="text-muted mt-1">+254 (0) 700 123 456</p>
                </div>
              </div>
              
              <div class="pt-6 mt-6 border-t border-gray-200">
                <h4 class="font-medium text-forest mb-4">Follow Us</h4>
                <div class="flex space-x-4">
                  <a href="#" class="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.082c1.602 0 1.792.006 2.425.035 1.627.074 2.385.845 2.46 2.459.028.633.034.822.034 2.424s-.006 1.792-.034 2.424c-.075 1.613-.832 2.386-2.46 2.46-.633.028-.822.035-2.425.035-1.602 0-1.792-.006-2.424-.035-1.63-.075-2.385-.849-2.46-2.46-.028-.632-.035-.822-.035-2.424s.007-1.792.035-2.424c.074-1.615.832-2.386 2.46-2.46.632-.029.822-.034 2.424-.034zm0 1.082c-1.575 0-1.756.005-2.353.034-1.023.047-1.574.537-1.621 1.621-.03.598-.034.778-.034 2.353s.004 1.755.034 2.353c.047 1.088.601 1.577 1.621 1.621.598.029.778.034 2.353.034 1.575 0 1.756-.005 2.354-.034 1.02-.044 1.574-.533 1.621-1.621.029-.598.034-.778.034-2.353s-.005-1.755-.034-2.353c-.046-1.085-.597-1.577-1.621-1.621-.598-.029-.779-.034-2.354-.034zm0 2.918c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 3.304c-1.19 0-2.304-.942-2.304-2.118 0-1.175 1.114-2.118 2.304-2.118 1.19 0 2.304.942 2.304 2.118 0 1.176-1.114 2.118-2.304 2.118z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Map Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden h-96">
          <!-- Placeholder for a map integration -->
          <div class="bg-gray-200 h-full w-full flex items-center justify-center">
            <p class="text-muted">Map Integration Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotification } from '@/composables/useNotification';

// Set page metadata
useHead({
  title: 'Contact CircularIQ - Get in Touch',
  meta: [
    { name: 'description', content: 'Have questions about CircularIQ? Contact our team for information about our plastic management and sustainability platform.' }
  ]
});

const { notify } = useNotification();
const loading = ref(false);
const formStatus = ref({
  message: '',
  type: ''
});

const form = ref({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: ''
});

const errors = ref({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: ''
});

// Form validation function
const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  };
  
  // Validate name
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required';
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate company
  if (!form.value.company.trim()) {
    errors.value.company = 'Company name is required';
    isValid = false;
  }
  
  // Validate subject
  if (!form.value.subject) {
    errors.value.subject = 'Please select a subject';
    isValid = false;
  }
  
  // Validate message
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required';
    isValid = false;
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters';
    isValid = false;
  }
  
  return isValid;
};

// Form submission handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  formStatus.value = { message: '', type: '' };
  
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success response
    formStatus.value = {
      message: 'Your message has been sent successfully! We will get back to you soon.',
      type: 'success'
    };
    
    notify({
      title: 'Message Sent',
      message: 'We have received your message and will get back to you soon.',
      type: 'success'
    });
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    formStatus.value = {
      message: 'There was an error sending your message. Please try again.',
      type: 'error'
    };
    
    notify({
      title: 'Error',
      message: 'Failed to send message. Please try again later.',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>