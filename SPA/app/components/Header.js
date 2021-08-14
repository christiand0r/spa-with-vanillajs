import { Title } from "./Title.js";
import { Menu } from "./Menu.js";
import { SearchForm } from "./SearchForm.js";

export function Header() {
  const $header = document.createElement("header");
  $header.classList.add("header");
  $header.append(Title());
  $header.append(Menu());
  $header.append(SearchForm());

  return $header;
}
