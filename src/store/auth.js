import { defineStore } from "pinia";
import AuthService from "@/services/auth.js";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("access_token") || "",
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
      // To remove the cookie
      Cookies.remove("access_token");
      localStorage.removeItem("role");
    },
    async login(data) {
      try {
        const response = await AuthService.login(data);
        this.access_token = response.access_token;
        this.role = response.role;
        // To set the cookie
        Cookies.set("access_token", response.access_token);
        localStorage.setItem("role", JSON.stringify(response.role));
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
