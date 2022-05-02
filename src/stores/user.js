import { defineStore } from 'pinia';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      id: '',
      username: '',
      email: '',
      description: '',
      avatar_url: '',
      phone: '',
    },
  }),
});

export default useUserStore;
