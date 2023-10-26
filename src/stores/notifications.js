import { ref, watch, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notifications', () => {
  const message = ref('');
  const error = ref(false);
  const showNotification = ref(false);

  // Reset notification with $reset
  // const $reset = () => {
  //   message.value = '';
  //   error.value = false;
  //   showNotification.value = false;
  // };

  // Reset notification with watch
  // watch(
  //   showNotification,
  //   () => {
  //     if (showNotification.value) {
  //       setTimeout(() => {
  //         showNotification.value = false;
  //         message.value = '';
  //         error.value = false;
  //       }, 3000);
  //     }
  //   },
  //   { deep: true }
  // );

  // Reset notification with watchEffect
  watchEffect(() => {
    if (showNotification.value) {
      setTimeout(() => {
        showNotification.value = false;
        message.value = '';
        error.value = false;
      }, 3000);
    }
  });

  return {
    message,
    error,
    showNotification,
    // $reset,
  };
});
