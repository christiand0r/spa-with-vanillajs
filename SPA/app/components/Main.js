export function Main() {
  const $main = document.createElement("main");
  $main.setAttribute("id", "main");

  if (!location.hash.includes("#/search")) $main.classList.add("grid-fluid");
  return $main;
}
