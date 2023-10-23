<script setup>
import { useDrinksStore } from '../stores/drinks';
import Drink from '../components/Drink.vue';


const drinks = useDrinksStore()

</script>

<template>
  <h1 class="text-6xl font-extrabold text-orange-400">Recetas</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 my-10">
    <Drink v-for="drink in drinks.drinks" :key="drink.idDrink" :drink="drink" />
  </div>
</template>
