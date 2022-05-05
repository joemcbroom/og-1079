import { defineStore } from 'pinia';
import { getPublicUrl } from '@/utils/publicUrl.js';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        username: '',
        description: '',
        avatar_url: '',
        phone: '',
        isAdmin: false,
      },
    };
  },
  actions: {
    async setUser(supabase) {
      const { id } = supabase.auth.user();
      try {
        const { data, error, status } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (error & (status !== 406)) throw error;
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
  },
});
