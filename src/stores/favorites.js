import { ref, watch, onMounted, computed } from 'vue';
import { defineStore } from 'pinia';
import { useDrinksStore } from './drinks';
import { useModalStore } from './modal';
import { useNotificationStore } from './notifications';

export const useFavoritesStore = defineStore('favorites', () => {
  const drinks = useDrinksStore();
  const modal = useModalStore();
  const notification = useNotificationStore();

  const favorites = ref([]);

  watch(
    favorites,
    () => {
      setFavoritesLS();
    },
    { deep: true }
  );

  onMounted(() => {
    const favoritesLS = localStorage.getItem('favorites');
    if (favoritesLS) {
      favorites.value = JSON.parse(favoritesLS);
    }
  });

  const noFavorites = computed(() => {
    return favorites.value.length === 0;
  });

  const setFavoritesLS = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  };

  const handleClickFavorites = () => {
    if (existsFavorites()) {
      deleteFavorite();
    } else {
      addFavorite();
    }
    modal.isModalVisible = false;
  };

  const addFavorite = () => {
    favorites.value.push(drinks.recipe);
    notification.showNotification = true;
    notification.message = 'Agregado a favoritos';

    // setTimeout(() => {
    //   notification.$reset();
    // }, 3000);
  };

  const existsFavorites = () => {
    const favoritesLs = JSON.parse(localStorage.getItem('favorites')) ?? [];
    return favoritesLs.some(
      (favorite) => favorite.idDrink === drinks.recipe.idDrink
    );
  };

  const deleteFavorite = () => {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinks.recipe.idDrink
    );

    notification.showNotification = true;
    notification.message = 'Eliminado de favoritos';

    // setTimeout(() => {
    //   notification.$reset();
    // }, 3000);
  };

  return {
    favorites,
    handleClickFavorites,
    existsFavorites,
    noFavorites,
  };
});
