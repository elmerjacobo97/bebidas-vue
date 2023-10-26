
<script setup>
import { computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal';
import { useDrinksStore } from '../stores/drinks';
import { useFavoritesStore } from '../stores/favorites';

const modal = useModalStore();
const drinks = useDrinksStore();
const favorites = useFavoritesStore();

const formattedIngredients = computed(() => {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (drinks.recipe[`strIngredient${i}`]) {
      ingredients.push({
        measure: drinks.recipe[`strMeasure${i}`],
        ingredient: drinks.recipe[`strIngredient${i}`]
      });
    }
  }
  return ingredients;
});

const displayInstructions = computed(() => {
  if (drinks.recipe.strInstructionsES) {
    return drinks.recipe.strInstructionsES;
  } else if (drinks.recipe.strInstructions) {
    return drinks.recipe.strInstructions;
  } else if (drinks.recipe.strInstructionsIT) {
    return drinks.recipe.strInstructionsIT;
  } else {
    return "Instrucciones no disponibles";
  }
});

</script>

<template>
  <TransitionRoot as="template" :show="modal.isModalVisible">
    <Dialog as="div" class="relative z-10" @close="modal.toggleModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div class="scroll-content mt-3 overflow-y-auto max-h-[calc(100vh-10rem)]">
                <div>
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-2xl font-medium leading-6 text-center text-gray-900">{{
                      drinks.recipe.strDrink }}
                    </DialogTitle>
                    <img :src="drinks.recipe.strDrinkThumb" :alt="drinks.recipe.strDrink" class="w-full mt-3 rounded">
                    <DialogTitle as="h3" class="mt-3 text-2xl font-medium leading-6 text-gray-900">Ingredientes y
                      cantidades
                    </DialogTitle>
                    <div class="mt-3">
                      <p class="text-lg text-gray-700" v-for="(item, index) in formattedIngredients" :key="index">
                        {{ item.measure ? item.measure + ' - ' : '' }}{{ item.ingredient }}
                      </p>
                    </div>
                    <div class="mt-3">
                      <DialogTitle as="h3" class="text-2xl font-medium leading-6 text-gray-900">Instrucciones
                      </DialogTitle>
                      <p class="mt-3 text-lg text-gray-700">
                        {{ displayInstructions }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between gap-4 mt-5 sm:mt-6">
                  <button type="button"
                    class="px-4 py-2 text-gray-700 transition duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
                    @click="modal.toggleModal">Cerrar</button>
                  <button type="button"
                    class="px-4 py-2 text-white transition duration-300 bg-orange-400 rounded-lg hover:bg-orange-500"
                    @click="favorites.handleClickFavorites">{{ modal.textButton }}</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>