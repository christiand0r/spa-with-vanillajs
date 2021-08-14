export function Loader() {
  const $loader = document.createElement("img");
  $loader.setAttribute("src", "app/assets/loader.svg");
  $loader.setAttribute("alt", "Cargando...");
  $loader.classList.add("loader");

  return $loader;
}
