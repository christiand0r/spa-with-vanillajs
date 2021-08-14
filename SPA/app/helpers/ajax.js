export async function ajax(props) {
  const { url, cbSuccess } = props;

  try {
    let res = await fetch(url);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let json = await res.json();
    cbSuccess(json);
  } catch (err) {
    let msg = err.statusText || "Ocurrio un error al acceder al API";
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforebegin",
        `<div class="error"><p>Error ${err.status}: ${msg}</p></div>`
      );
    document.querySelector(".loader").style.setProperty("display", "none");
    console.log(err);
  }
}
