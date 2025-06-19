<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-forest">Team Management</h1>
        <p class="text-muted">Manage your team members and their access to CircularIQ.</p>
      </div>

      <!-- Team Overview and Add Button -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-muted">
            Total Members: 
            <span class="font-medium">{{ isLoading ? '...' : teamMembers.length }}</span>
          </p>
        </div>
        <button 
          class="btn btn-primary"
          @click="showInviteModal = true"
          :disabled="!authStore.isAuthenticated || userRole !== 'Admin'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Invite Team Member
        </button>
      </div>

      <!-- Team Members List -->
      <BaseCard>
        <div class="overflow-x-auto">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="flex flex-col items-center">
              <svg class="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-muted">Loading team members...</p>
            </div>
          </div>

          <!-- Team Members Table -->
          <table v-else class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="!isLoading && teamMembers.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-muted">
                  No team members found. Click "Invite Team Member" to add your first team member.
                </td>
              </tr>
              <tr v-for="member in teamMembers" :key="member.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-forest flex items-center justify-center text-white">
                      {{ getInitials(member.full_name) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ member.full_name }}</div>
                      <div class="text-xs text-muted">Added {{ formatDate(member.created_at) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge :color="getRoleColor(member.role)">{{ member.role }}</Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ member.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusDot :color="member.status === 'Active' ? 'success' : member.status === 'Pending' ? 'warning' : 'danger'" />
                  <span class="ml-2 text-sm">{{ member.status }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    class="text-primary hover:text-primary-hover mr-4"
                    :disabled="userRole !== 'Admin'"
                  >
                    Edit
                  </button>
                  <button 
                    class="text-danger hover:text-danger/80" 
                    v-if="member.email !== currentUserEmail"
                    :disabled="userRole !== 'Admin'"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>

      <!-- Invitation History -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-forest mb-4">Pending Invitations</h2>
        <BaseCard>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Invited By</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Invited On</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="isLoading">
                  <td colspan="5" class="px-6 py-4 text-center text-muted">
                    Loading invitations...
                  </td>
                </tr>
                <tr v-else-if="pendingInvitations.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-muted">
                    No pending invitations.
                  </td>
                </tr>
                <tr v-for="invitation in pendingInvitations" :key="invitation.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ invitation.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Badge :color="getRoleColor(invitation.role)">{{ invitation.role }}</Badge>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ invitation.invited_by }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-muted">{{ formatDate(invitation.created_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      class="text-primary hover:text-primary-hover mr-4"
                      :disabled="userRole !== 'Admin'"
                    >
                      Resend
                    </button>
                    <button 
                      class="text-danger hover:text-danger/80"
                      :disabled="userRole !== 'Admin'"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>

      <!-- Role Explanation -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-forest mb-4">User Role Permissions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BaseCard>
            <div class="p-4">
              <div class="mb-4">
                <Badge color="forest">Admin</Badge>
              </div>
              <h3 class="font-medium text-forest mb-2">Full Access</h3>
              <ul class="text-sm text-muted space-y-1">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Manage company settings
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Invite and manage users
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Edit and delete all data
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Access billing and subscription
                </li>
              </ul>
            </div>
          </BaseCard>

          <BaseCard>
            <div class="p-4">
              <div class="mb-4">
                <Badge color="primary">Analyst</Badge>
              </div>
              <h3 class="font-medium text-forest mb-2">Data Management Access</h3>
              <ul class="text-sm text-muted space-y-1">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Enter and edit product data
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Generate reports
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  View compliance status
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-danger mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cannot manage users
                </li>
              </ul>
            </div>
          </BaseCard>

          <BaseCard>
            <div class="p-4">
              <div class="mb-4">
                <Badge color="info">Viewer</Badge>
              </div>
              <h3 class="font-medium text-forest mb-2">Read-Only Access</h3>
              <ul class="text-sm text-muted space-y-1">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  View dashboards and reports
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-danger mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cannot edit any data
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-danger mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cannot generate new reports
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-danger mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cannot manage users
                </li>
              </ul>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Invite Team Member Modal -->
      <div v-if="showInviteModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="showInviteModal = false"></div>
        <div class="relative bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
          <div class="p-6">
            <h3 class="text-lg font-medium text-forest mb-4">Invite Team Member</h3>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-muted mb-1">Email Address</label>
              <FormInput
                v-model="inviteForm.email"
                type="email"
                placeholder="colleague@example.com"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-muted mb-1">Role</label>
              <select v-model="inviteForm.role" class="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Admin">Admin</option>
                <option value="Analyst">Analyst</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button
                class="btn btn-outline"
                @click="showInviteModal = false"
              >
                Cancel
              </button>
              <button
                class="btn btn-primary"
                @click="handleInvite"
                :disabled="!inviteForm.email"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '~/composables/useNotification';

definePageMeta({
  layout: false,
});

// Get auth store for current user info
const authStore = useAuthStore();
const notification = useNotification();

// Reactive state
const teamMembers = ref([]);
const pendingInvitations = ref([]);
const currentUserEmail = ref('');
const isLoading = ref(false);
const showInviteModal = ref(false);
const inviteForm = ref({
  email: '',
  role: 'Viewer'
});

// Computed properties
const userRole = computed(() => {
  return authStore.userRole || 'Viewer';
});

// Helper functions
const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getRoleColor = (role) => {
  switch(role) {
    case 'Admin': return 'forest';
    case 'Analyst': return 'primary';
    case 'Viewer': return 'info';
    default: return 'muted';
  }
};

// Handle invite form submission
async function handleInvite() {
  if (!inviteForm.value.email) {
    notification.error('Please enter an email address');
    return;
  }
  
  const result = await inviteTeamMember(inviteForm.value.email, inviteForm.value.role);
  
  if (result.success) {
    notification.success('Invitation sent successfully');
    showInviteModal.value = false;
    inviteForm.value.email = '';
    inviteForm.value.role = 'Viewer';
  } else {
    notification.error(result.message || 'Failed to send invitation');
  }
}

// Fetch team members from Supabase
async function fetchTeamMembers() {
  if (!authStore.isAuthenticated || !authStore.companyId) return;
  
  isLoading.value = true;
  
  try {
    const { useSupabase } = await import('~/composables/useSupabase');
    const supabase = useSupabase();
    
    if (!supabase) {
      console.error('Supabase client not available');
      return;
    }
    
    // Fetch team members who belong to the current company
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('company_id', authStore.companyId);
      
    if (error) throw error;
    
    if (data) {
      teamMembers.value = data.map(user => ({
        id: user.id,
        full_name: user.full_name || user.email.split('@')[0],
        email: user.email,
        role: user.role || 'Viewer',
        status: user.active ? 'Active' : 'Inactive',
        created_at: user.created_at
      }));
    } else {
      // Fallback to sample data
      teamMembers.value = [
        {
          id: 1,
          full_name: authStore.userName || 'Demo User',
          email: authStore.user?.email || 'demo.user@example.com',
          role: 'Admin',
          status: 'Active',
          created_at: new Date(2025, 0, 15)
        }
      ];
    }
    
    // Fetch pending invitations
    const { data: invitationData, error: invitationError } = await supabase
      .from('invitations')
      .select('*')
      .eq('company_id', authStore.companyId)
      .eq('status', 'pending');
      
    if (!invitationError && invitationData) {
      pendingInvitations.value = invitationData.map(invite => ({
        id: invite.id,
        email: invite.email,
        role: invite.role || 'Viewer',
        invited_by: invite.invited_by_name || authStore.userName,
        created_at: invite.created_at
      }));
    } else {
      // Fallback sample data
      pendingInvitations.value = []; // Empty for now
    }
  } catch (error) {
    console.error('Error fetching team members:', error);
  } finally {
    isLoading.value = false;
  }
}

// Invite new team member
async function inviteTeamMember(email, role) {
  if (!authStore.isAuthenticated || !authStore.companyId) return;
  
  try {
    const { useSupabase } = await import('~/composables/useSupabase');
    const supabase = useSupabase();
    
    if (!supabase) {
      console.error('Supabase client not available');
      return { success: false, message: 'Supabase client not available' };
    }
    
    const invitation = {
      email,
      role,
      company_id: authStore.companyId,
      invited_by: authStore.user?.id,
      invited_by_name: authStore.userName,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('invitations')
      .insert(invitation)
      .select();
      
    if (error) throw error;
    
    if (data) {
      // Add the new invitation to the list
      pendingInvitations.value = [
        {
          id: data[0].id,
          email: data[0].email,
          role: data[0].role,
          invited_by: data[0].invited_by_name,
          created_at: data[0].created_at
        },
        ...pendingInvitations.value
      ];
      
      return { success: true };
    }
    
    return { success: false, message: 'Failed to create invitation' };
  } catch (error) {
    console.error('Error inviting team member:', error);
    return { success: false, message: error.message };
  }
}

// Initialize page
onMounted(async () => {
  // Get current user info from auth store
  currentUserEmail.value = authStore.user?.email || '';
  
  // Fetch team members data
  await fetchTeamMembers();
});

// Set page metadata
useHead({
  title: 'Team Management - CircularIQ',
  meta: [
    { name: 'description', content: 'Manage your team members and their access to CircularIQ.' }
  ]
});
</script>
