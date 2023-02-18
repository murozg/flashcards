import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

let app = createApp(App);
app.directive("focus", {
  mounted: (el) => el.focus(),
});
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith("my-");
};
app.use(router).mount("#app");
