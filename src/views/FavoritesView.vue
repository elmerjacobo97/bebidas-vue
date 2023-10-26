<script setup>
import { useFavoritesStore } from '../stores/favorites';
import Drink from '../components/Drink.vue';

const favorites = useFavoritesStore();

</script>

<template>
  <h1 class="text-6xl font-extrabold text-orange-400">Favoritos</h1>
  <p class="mt-3 text-lg text-gray-700" v-if="favorites.noFavorites">No hay favoritos, empieza a buscar las mejores
    recetas y
    disfrútalas</p>
  <div v-else class="grid grid-cols-1 gap-5 my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    <Drink v-for="drink in favorites.favorites" :key="drink.idDrink" :drink="drink" />
  </div>
</template>
 