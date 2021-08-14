import api from "./wp_api.js";
import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";

export async function infiniteScroll() {
  const d = document,
    w = window;

  let query = localStorage.getItem("wpSearch"),
    apiURL,
    Component; //High Order Component (HOC)

  //HOC es una funcionalidad que permite dependiendo de nuestras necesidad utilizar un componente o funcionalidad según sea necesario

  w.addEventListener("scroll", async () => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement;
    let { hash } = w.location;

    //Infinite Scroll
    if (scrollTop + clientHeight >= scrollHeight) {
      api.page++;

      if (!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }

      d.querySelector(".loader").style.setProperty("display", "block");

      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          // console.log(posts);
          posts.forEach((post) => {
            d.getElementById("main").insertAdjacentHTML(
              "beforeend",
              Component(post)
            );
            d.querySelector(".loader").style.setProperty("display", "none");
          });
        },
      });
    }
  });
}
