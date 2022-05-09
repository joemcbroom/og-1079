<script setup>
import { ref } from 'vue';
import { searchGifs } from '@/services/gifs';

const modal = ref(null);
const searchTerm = ref('');
const gifs = ref([]);
const awaitingSearch = ref(false);

const nextPage = ref(1);

const openModal = () => {
  modal.value.showModal();
};

const closeModal = () => {
  modal.value.close();
};

const handleSearchGifs = async () => {
  if (!awaitingSearch.value) {
    setTimeout(async () => {
      if (!searchTerm.value) {
        gifs.value = [];
        awaitingSearch.value = false;
        return;
      }
      if (searchTerm.value.length < 3) {
        awaitingSearch.value = false;
        return;
      }
      const { results, next } = await searchGifs({ query: searchTerm.value });
      gifs.value = results;
      nextPage.value = next ? next : 1;
      awaitingSearch.value = false;
    }, 500);
  }
  awaitingSearch.value = true;
};

const loadMoreGifs = async () => {
  const { results, next } = await searchGifs({
    query: searchTerm.value,
    next: nextPage.value,
  });
  gifs.value = gifs.value.concat(results);
  nextPage.value = next ? next : 1;
};
</script>
<template>
  <span
    @click="openModal"
    class="absolute right-1/4 top-2 px-2 mr-1 rounded bg-zinc-400 cursor-pointer"
  >
    GIF
  </span>
  <dialog ref="modal" class="p-0 pb-4">
    <div class="flex flex-col justify-center items-center gap-4">
      <input
        type="text"
        class="w-full text-zinc-800 px-2 outline-none border"
        placeholder="Search..."
        v-model="searchTerm"
        @input="handleSearchGifs"
      />
      <div id="gif-container">
        <transition-group
          tag="div"
          name="list"
          class="px-4 flex flex-wrap"
          v-if="gifs.length > 0"
        >
          <img
            v-for="gif in gifs"
            :src="gif.media[0].tinygif.url"
            :key="gif.id"
            class="w-1/3 aspect-square"
          />

          <div
            class="text-sm text-center text-ogGreen underline cursor-pointer"
            @click="loadMoreGifs"
            :key="'loadMore'"
          >
            Load more...
          </div>
        </transition-group>
        <div class="text-2xl" v-else>Search for Gifs!</div>
      </div>
      <button
        class="bg-ogGreen px-2 py-1 text-zinc-50 rounded"
        @click="closeModal"
      >
        Close
      </button>
    </div>
  </dialog>
</template>

<style scoped>
#gif-container {
  width: 16rem;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

.list-enter-active {
  transition: all 0.8s ease-in-out;
}

.list-leave-active {
  transition: all 1.2s ease-in-out;
  position: absolute;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
