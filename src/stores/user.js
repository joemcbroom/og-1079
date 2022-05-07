import { defineStore } from 'pinia';
import { getPublicUrl } from '@/utils/publicUrl.js';
import { getUserProfile, supabase } from '@/services/supabase.js';

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}

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
      return `#${intToRGB(hashCode(supabase.auth.user().id))}`;
    },
  },
});
