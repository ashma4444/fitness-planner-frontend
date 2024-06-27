/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// css
import "@/styles/css/global.css";

// Composables
import { createApp } from "vue";

// axios
import axios from "axios";

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem("access")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
  }
  return config;
});

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
