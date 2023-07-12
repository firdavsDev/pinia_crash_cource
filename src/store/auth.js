import { defineStore } from "pinia";
import AuthService from "@/services/auth.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("access_token") || "",
    role: JSON.parse(localStorage.getItem("role")) || {},
  }),
  getters: {
    getToken() {
      return this.access_token;
    },
    getUser() {
      return this.role;
    },
  },
  actions: {
    setToken(access_token) {
      this.access_token = access_token;
    },
    setUser(role) {
      this.role = role;
    },
    logout() {
      this.access_token = "";
      this.role = {};
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
    },
    async login(data) {
      try {
        const response = await AuthService.login(data);
        this.access_token = response.access_token;
        this.role = response.role;
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("role", JSON.stringify(response.role));
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
