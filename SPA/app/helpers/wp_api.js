/* OPTIONS */
let page = 1;
const PER_PAGE = 8;

/* ENDPOINTS */
const NAME = "css-tricks",
  DOMAIN = `https://${NAME}.com`,
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  POSTS = `${API_WP}/posts?_embed&per_page=${PER_PAGE}`,
  POST = `${API_WP}/posts`,
  SEARCH = `${API_WP}/search?_embed&per_page=${PER_PAGE}&search=`;

export default {
  NAME,
  DOMAIN,
  SITE,
  API_WP,
  page,
  PER_PAGE,
  POSTS,
  POST,
  SEARCH,
};
