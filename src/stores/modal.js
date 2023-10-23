import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false);

  const toggleModal = () => {
    isModalVisible.value = !isModalVisible.value;
  };

  return {
    isModalVisible,
    toggleModal,
  };
});
