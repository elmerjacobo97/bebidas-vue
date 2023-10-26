import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useFavoritesStore } from './favorites';
import { useDrinksStore } from './drinks';

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false);

  const favorites = useFavoritesStore();
  const drinks = useDrinksStore();

  const textButton = computed(() => {
    return favorites.existsFavorites(drinks.recipe.idDrink)
      ? 'Quitar de favoritos'
      : 'Agregar a favoritos';
  });

  const toggleModal = () => {
    isModalVisible.value = !isModalVisible.value;
  };

  return {
    isModalVisible,
    toggleModal,
    textButton,
  };
});
