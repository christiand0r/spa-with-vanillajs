import { App } from "./App.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";
import api from "./helpers/wp_api.js";

document.addEventListener("DOMContentLoaded", () => {
  App();
  infiniteScroll();
});

window.addEventListener("hashchange", (e) => {
  api.page = 1;
  App();
});
