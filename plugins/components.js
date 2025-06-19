// Global component registration
import { defineNuxtPlugin } from '#app';
import BaseButton from '~/components/ui/BaseButton.vue';
import BaseCard from '~/components/ui/BaseCard.vue';
import FormInput from '~/components/ui/FormInput.vue';
import Badge from '~/components/ui/Badge.vue';
import StatusDot from '~/components/ui/StatusDot.vue';
import Notification from '~/components/ui/Notification.vue';
import NotificationContainer from '~/components/ui/NotificationContainer.vue';

export default defineNuxtPlugin(nuxtApp => {
  // Register components globally
  nuxtApp.vueApp.component('BaseButton', BaseButton);
  nuxtApp.vueApp.component('BaseCard', BaseCard);
  nuxtApp.vueApp.component('FormInput', FormInput);
  nuxtApp.vueApp.component('Badge', Badge);
  nuxtApp.vueApp.component('StatusDot', StatusDot);
  nuxtApp.vueApp.component('Notification', Notification);
  nuxtApp.vueApp.component('NotificationContainer', NotificationContainer);
});