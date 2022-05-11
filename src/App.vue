<script setup>
import { RouterView } from 'vue-router';
import HeaderBar from '@/components/HeaderBar.vue';
import isMobile from './utils/isMobile';
import { onMounted } from 'vue';

onMounted(() => {
  if (isMobile()) {
    document.querySelector('#app').classList.add('mobile');
  }
});
</script>

<template>
  <HeaderBar />
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName || 'fade'">
      <main
        class="max-w-sm h-full mx-auto flex flex-col justify-center items-center z-0"
        :key="route.path"
      >
        <component :is="Component" />
      </main>
    </transition>
  </router-view>
</template>

<style>
main {
  min-height: calc(100vh - 81px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 1;
}

#app.mobile {
  min-height: calc(100vh - 81px);
  min-height: -webkit-fill-available;
}
</style>
