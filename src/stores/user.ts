import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const username = ref("");
  const avatarUrl = ref("");

  function getUsername() {
    return username.value;
  }

  function getToken() {
    return token.value;
  }

  function setToken(t: string) {
    token.value = t;
  }

  function setUsername(n: string) {
    username.value = n;
  }

  function logout() {
    token.value = "";
    username.value = "";
  }

  return { getToken, setToken, getUsername, setUsername, logout, username, token, avatarUrl };
});