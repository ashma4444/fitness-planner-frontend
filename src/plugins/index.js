/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from "@/router";
import axios from "axios";
import vuetify from "./vuetify";

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(axios);
}
