export function Post(props) {
  let { content, date, title } = props[0];
  let dateFormatted = new Date(date).toLocaleDateString();

  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${dateFormatted}</time>
      </aside>
      <hr>
      <article>${content.rendered}</article>
    </section>
  `;
}
