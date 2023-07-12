import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import "./style.css";

// app
const app = createApp(App);

// plugins
app.use(createPinia());
app.use(Antd);
app.use(router);
app.mount("#app");

app.config.globalProperties.$message = message;
