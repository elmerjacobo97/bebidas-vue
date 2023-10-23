<script setup>
import { useDrinksStore } from '../stores/drinks';



defineProps({
  drink: {
    type: Object,
    required: true
  }
})

const drinks = useDrinksStore();

</script>

<template>
  <div class="rounded-lg shadow-lg">
    <div class="overflow-hidden">
      <img :src="drink.strDrinkThumb" :alt="drink.strDrink"
        class="w-full transition-transform hover:scale-125 hover:rotate-2">
    </div>
    <div class="p-5">
      <h2 class="text-2xl font-extrabold text-gray-700 truncate">{{ drink.strDrink }}</h2>
      <button type="button"
        class="w-full px-4 py-2 mt-2 font-bold text-white transition duration-300 ease-in-out bg-orange-400 rounded hover:bg-orange-500 hover:scale-110"
        @click="drinks.selectedDrinkById(drink.idDrink)">
        Ver receta
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
