export function SearchCard(props) {
  let { title, _embedded } = props;
  let excerpt = _embedded.self[0].excerpt.rendered,
    slug = _embedded.self[0].slug;
  return `
    <article class="post-card search">
      <h2>${title}</h2>
      <details>
        <summary>Fragmento</summary>
        ${excerpt.replace("[&hellip;]", "&hellip;")}
      </details>
      <a href="#/${slug}">Ver Post</a
    </article>
  `;
}
