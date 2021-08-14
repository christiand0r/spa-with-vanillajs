import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";
import { NoResults } from "./NoResults.js";
import { Post } from "./Post.js";
import { ContactForm } from "./ContactForm.js";

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let { hash } = location;

  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        posts.forEach((post) =>
          $main.insertAdjacentHTML("beforeend", PostCard(post))
        );
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      d.querySelector(".loader").style.setProperty("display", "none");
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        if (search.length === 0) {
          $main.insertAdjacentHTML("afterbegin", NoResults(query));
        } else {
          search.forEach((result) => {
            $main.insertAdjacentHTML("beforeend", SearchCard(result));
          });
        }
      },
    });
  } else if (hash === "#/contact") {
    $main.append(ContactForm());
  } else {
    await ajax({
      url: `${api.POST}/?slug=${hash.slice(2)}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.setProperty("display", "none");
}
