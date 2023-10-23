import drinksApi from '../api/drinksApi';

export default {
  getCategories() {
    return drinksApi.get('/list.php?c=list');
  },
  searchDrinks({ name, category }) {
    return drinksApi.get(`/filter.php?i=${name}&c=${category}`);
  },
  selectedDrinkById(id) {
    return drinksApi.get(`/lookup.php?i=${id}`);
  },
};
