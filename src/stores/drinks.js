import { onMounted, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import drinksService from '../services/drinksService';
import { useModalStore } from './modal';

export const useDrinksStore = defineStore('drinks', () => {
  const categories = ref([]);
  const drinks = ref([]);
  const recipe = ref({});
  const search = reactive({
    name: '',
    category: '',
  });

  const modal = useModalStore();

  const getCategories = async () => {
    try {
      const { data } = await drinksService.getCategories();
      categories.value = data.drinks;
    } catch (error) {
      console.log('Error getting categories', error);
    }
  };

  const searchDrinks = async () => {
    try {
      const { data } = await drinksService.searchDrinks(search);
      drinks.value = data.drinks;
    } catch (error) {
      console.log('Error searching drinks', error);
    }
  };

  const selectedDrinkById = async (id) => {
    try {
      const { data } = await drinksService.selectedDrinkById(id);
      console.log(data.drinks[0]);
      recipe.value = data.drinks[0];
      modal.toggleModal();
    } catch (error) {
      console.log('Error getting selected drink', error);
    }
  };

  onMounted(() => {
    getCategories();
  });

  return {
    categories,
    search,
    searchDrinks,
    drinks,
    selectedDrinkById,
    recipe,
  };
});
