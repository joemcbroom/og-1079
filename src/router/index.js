import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';
import EventsView from '@/views/EventsView.vue';
import ChatView from '@/views/ChatView.vue';
import AuthView from '@/views/AuthView.vue';
import AuthCallback from '@/views/AuthCallback.vue';
import ProfileView from '@/views/ProfileView.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { pinia } from '@/stores';

const authStore = useAuthStore(pinia);
const userStore = useUserStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        includeInNav: true,
      },
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: {
        includeInNav: true,
      },
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true, includeInNav: true },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/callback',
      name: 'callback',
      component: AuthCallback,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

const { supabase } = authStore;
const routes = router.getRoutes();
supabase.auth.onAuthStateChange((event) => {
  if (event == 'SIGNED_OUT') {
    console.log('signed out');
    authStore.isAuthenticated = false;
    return router.push('/auth');
  }
  if (event == 'SIGNED_IN') {
    authStore.isAuthenticated = true;
    userStore.setUser(supabase);
  }
});

router.beforeEach(({ meta }) => {
  if (meta.requiresAuth && !supabase.auth.currentSession) {
    return { name: 'auth' };
  }
});

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export default router;
