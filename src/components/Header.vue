<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDrinksStore } from '../stores/drinks';
import { useNotificationStore } from '../stores/notifications';

const route = useRoute();
const store = useDrinksStore(); // NO aplicar desestructuración
const notification = useNotificationStore();

const pageHome = computed(() => route.name === 'home');

const handleSubmit = () => {
  //  validación
  if (Object.values(store.search).includes('')) {
    // notification.showNotification = true;
    // notification.message = 'Ingresa un nombre o ingrediente';
    // notification.error = true;

    // Otra manera de establecer el error con $patch que es utilizado para escribir múltiples valores el state de un store.
    // notification.$patch({
    //   showNotification: true,
    //   message: 'Ingresa un nombre o ingrediente',
    //   error: true
    // })

    // También es válido hacer con $state
    notification.$state = {
      showNotification: true,
      message: 'Ingresa un nombre o ingrediente',
      error: true
    }
    return;
  }

  store.searchDrinks();
};

</script>
<template>
  <header class="bg-slate-800" :class="{ 'header': pageHome }">
    <div class="container px-5 py-16 mx-auto">
      <div>
        <div class="flex items-center justify-between">
          <div class="">
            <RouterLink :to="{ name: 'home' }">
              <img class="w-32" src="/img/logo.svg" alt="logotipo">
            </RouterLink>
          </div>
          <nav class="flex gap-4">
            <RouterLink :to="{ name: 'home' }" class="text-lg text-gray-100 hover:underline"
              active-class="text-orange-400 underline">Inicio</RouterLink>
            <RouterLink :to="{ name: 'favorites' }" class="text-lg text-gray-100 hover:underline"
              active-class="text-orange-400 underline">Favoritos</RouterLink>
          </nav>
        </div>
      </div>
      <form v-if="pageHome" class="p-5 my-32 space-y-5 bg-orange-400 shadow-lg md:w-1/2 2xl:w-1/3 rounded-xl"
        @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <label for="ingredient" class="block font-semibold text-gray-100 uppercase text-md">Nombre o
            Ingredientes</label>
          <input type="text" id="ingredient" class="w-full px-4 py-2 text-gray-400 rounded-lg focus:outline-none"
            placeholder="Nombre o ingrediente: Ej: Cerveza, Tequila, etc" v-model="store.search.name">
        </div>
        <div class="space-y-4">
          <label for="category" class="block font-semibold text-gray-100 uppercase text-md">Categoría</label>
          <select id="category" class="w-full px-4 py-2 text-gray-400 rounded-lg focus:outline-none"
            v-model="store.search.category">
            <option value="">-- Seleccione --</option>
            <option :value="category.strCategory" v-for="category in store.categories" :key="category.strCategory">
              {{ category.strCategory }}
            </option>
          </select>
        </div>
        <button type="submit"
          class="w-full px-4 py-2 text-gray-100 transition duration-300 bg-orange-600 rounded-lg hover:bg-orange-500">Buscar</button>
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