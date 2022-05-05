import { defineStore } from 'pinia';

export const useChatUsersStore = defineStore('chatUsers', {
  state: () => {
    return {
      chatUsers: [],
    };
  },
  getters: {
    chatUser() {
      return (id) => {
        return this.chatUsers.find((chatUser) => chatUser.id === id);
      };
    },
  },
});
