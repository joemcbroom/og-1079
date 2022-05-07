import { defineStore } from 'pinia';
import { getPublicUrl } from '@/utils/publicUrl.js';
import { getUserProfile } from '@/services/supabase.js';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        username: '',
        description: '',
        avatar_url: '',
        phone: '',
        isAdmin: false,
        color: '',
      },
    };
  },
  actions: {
    async setUser(supabase) {
      const { id } = supabase.auth.user();
      try {
        const data = await getUserProfile(id);
        if (data) {
          this.user = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    profileImagePublicURL() {
      const { avatar_url } = this.user;
      return getPublicUrl(avatar_url);
    },
    userColor() {
      if (this.user.color) return this.user.color;
    },
  },
});
