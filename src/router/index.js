import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../views/AuthCallback.vue'),
      beforeEnter: (to) => {
        /* Parse the route hash into a dictionary */
        const hashDictionary = {};
        // first remove the actual '#' character
        const hash = to.hash.replace('#', '');
        // split hash into key-value pairs
        hash.split('&').forEach((item) => {
          // split 'key=value' into [key, value]
          const [key, value] = item.split('=');
          // add to results
          hashDictionary[key] = value;
        });

        if (
          [
            'access_token',
            'expires_in',
            'provider_token',
            'refresh_token',
            'token_type',
          ].some((key) => !(key in hashDictionary))
        )
          return '/';
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

export default router;
