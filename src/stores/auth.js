import { supabase } from '@/services/supabase';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { supabase, isAuthenticated: false };
  },
  actions: {
    async signOut() {
      const userStore = useUserStore();
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.isAuthenticated = false;
        userStore.$reset();
      } catch (error) {
        alert(error.message);
      }
    },
  },
});
