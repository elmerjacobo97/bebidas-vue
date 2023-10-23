<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDrinksStore } from '../stores/drinks';


const route = useRoute();
const store = useDrinksStore(); // NO aplicar desestructuración

const pageHome = computed(() => route.name === 'home');

const handleSubmit = () => {
  // TODO: validación


  store.searchDrinks();
};

</script>
<template>
  <header class="bg-slate-800" :class="{ 'header': pageHome }">
    <div class="mx-auto container px-5 py-16">
      <div>
        <div class="flex justify-between items-center">
          <div class="">
            <RouterLink :to="{ name: 'home' }">
              <img class="w-32" src="/img/logo.svg" alt="logotipo">
            </RouterLink>
          </div>
          <nav class="flex gap-4">
            <RouterLink :to="{ name: 'home' }" class="text-gray-100 text-lg hover:underline"
              active-class="text-orange-400 underline">Inicio</RouterLink>
            <RouterLink :to="{ name: 'favorites' }" class="text-gray-100 text-lg hover:underline"
              active-class="text-orange-400 underline">Favoritos</RouterLink>
          </nav>
        </div>
      </div>
      <form v-if="pageHome" class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 rounded-xl shadow-lg space-y-5 p-5"
        @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <label for="ingredient" class="block text-md text-gray-100 uppercase font-semibold">Nombre o
            Ingredientes</label>
          <input type="text" id="ingredient" class="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-400"
            placeholder="Nombre o ingrediente: Ej: Cerveza, Tequila, etc" v-model="store.search.name">
        </div>
        <div class="space-y-4">
          <label for="category" class="block text-md text-gray-100 uppercase font-semibold">Categoría</label>
          <select id="category" class="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-400"
            v-model="store.search.category">
            <option value="">-- Seleccione --</option>
            <option :value="category.strCategory" v-for="category in store.categories" :key="category.strCategory">
              {{ category.strCategory }}
            </option>
          </select>
        </div>
        <button type="submit"
          class="w-full px-4 py-2 rounded-lg bg-orange-600 text-gray-100 hover:bg-orange-500 transition duration-300">Buscar</button>
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>