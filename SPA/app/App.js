import { Header } from "./components/Header.js";
import { Loader } from "./components/Loader.js";
import { Main } from "./components/Main.js";
import { Router } from "./components/Router.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";

export function App() {
  const $root = document.getElementById("root");

  $root.innerHTML = null;
  $root.insertAdjacentElement("afterbegin", Header());
  $root.insertAdjacentElement("beforeend", Main());
  $root.append(Loader());

  Router();
}
