import axios from "axios";
import { message } from "ant-design-vue";

const service = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: "https://hisobot.karantin.uz",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

service.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

service.interceptors.response.use((response) => {
  if (response.status === 200) {
    message.success("Muvaffaqiyatli bajarildi!");
  } else {
    message.error("Xatolik yuz berdi!");
  }
  return response;
});

export default service;
