import { defineStore } from 'pinia';

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
      profileImagePublicURL: null,
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
          const { avatar_url } = data;
          if (avatar_url) {
            const { publicURL } = supabase.storage
              .from('avatars')
              .getPublicUrl(avatar_url);
            this.profileImagePublicURL = publicURL;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
