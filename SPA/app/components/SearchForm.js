export function SearchForm() {
  const d = document;
  const $form = d.createElement("form"),
    $searcher = d.createElement("input");

  $form.classList.add("search-form");

  $searcher.setAttribute("type", "search");
  $searcher.setAttribute("name", "search");
  $searcher.setAttribute("placeholder", "Buscar...");
  $searcher.setAttribute("autocomplete", "off");

  $form.append($searcher);

  if (location.hash.includes("#/search")) {
    $searcher.value = localStorage.getItem("wpSearch");
  }

  d.addEventListener("search", (e) => {
    if (!e.target.matches('input[type="search"]')) return false;

    if (!e.target.value) localStorage.removeItem("wpSearch");
  });

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;

    e.preventDefault();
    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;
  });

  return $form;
}
