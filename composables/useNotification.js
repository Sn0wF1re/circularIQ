/**
 * Composable for managing notifications in the CircularIQ platform
 */
import { ref, provide, inject } from 'vue';

// Notification ID counter
let notificationId = 0;

// Create a global notification state that can be provided/injected
const notificationsSymbol = Symbol('notifications');

/**
 * Create and provide a notification state for the app
 * @returns {Object} Notification state methods
 */
export const provideNotifications = () => {
  // Ref to store active notifications
  const notifications = ref([]);

  // Add a notification
  const add = (notification) => {
    const id = notificationId++;
    
    // Create the notification object with defaults
    const newNotification = {
      id,
      title: notification.title || '',
      message: notification.message || '',
      type: notification.type || 'info', // info, success, warning, error
      timeout: notification.timeout !== undefined ? notification.timeout : 5000,
      ...notification
    };
    
    // Add to notifications array
    notifications.value.push(newNotification);
    
    // Auto-remove after timeout if specified
    if (newNotification.timeout > 0) {
      setTimeout(() => {
        remove(id);
      }, newNotification.timeout);
    }
    
    return id;
  };
  
  // Remove a notification by ID
  const remove = (id) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };
  
  // Clear all notifications
  const clear = () => {
    notifications.value = [];
  };
  
  // Helper methods for common notification types
  const info = (title, message, options = {}) => 
    add({ title, message, type: 'info', ...options });
    
  const success = (title, message, options = {}) => 
    add({ title, message, type: 'success', ...options });
    
  const warning = (title, message, options = {}) => 
    add({ title, message, type: 'warning', ...options });
    
  const error = (notification = {}) => {
    // Support both object-style and title/message style calls
    if (typeof notification === 'string' || notification instanceof String) {
      return add({ title: notification, message: arguments[1] || '', type: 'danger', ...arguments[2] || {} });
    }
    
    // Process error object if passed directly
    if (notification.error && typeof notification.error === 'object') {
      const errorObj = notification.error;
      const title = notification.title || 'Error';
      const message = errorObj.message || JSON.stringify(errorObj);
      return add({ title, message, type: 'danger', ...notification });
    }
    
    return add({ ...notification, type: 'danger' });
  };
  
  // Create notification context
  const notificationContext = {
    notifications,
    add,
    remove,
    clear,
    info,
    success,
    warning,
    error
  };
  
  // Provide notification context to component tree
  provide(notificationsSymbol, notificationContext);
  
  return notificationContext;
};

/**
 * Use the notification context in any component
 * @returns {Object} Notification state and methods
 */
export const useNotification = () => {
  const notifications = inject(notificationsSymbol);
  
  // If notifications haven't been provided, return a fallback implementation
  if (!notifications) {
    console.warn('Notifications were not provided. Falling back to basic implementation.');
    
    // Return a fallback implementation that uses console methods
    return {
      notifications: ref([]),
      add: (notification) => {
        console.log(`Notification: ${notification.title} - ${notification.message}`);
        return 0;
      },
      remove: () => {},
      clear: () => {},
      info: (title, message) => console.info(`${title}: ${message}`),
      success: (title, message) => console.log(`✓ ${title}: ${message}`),
      warning: (title, message) => console.warn(`⚠ ${title}: ${message}`),
      error: (title, message) => console.error(`✗ ${title}: ${message}`)
    };
  }
  
  return notifications;
};