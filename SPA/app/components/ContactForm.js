export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $style = d.getElementById("dynamic-styles");

  $style.insertAdjacentHTML(
    "afterbegin",
    `
    .contact-form {
      --form-valid-color: #016901;
      --form-invalid-color: #880101;
      --form-requerid-color: #e7b100;
      --form-alert-letter-color: #fff;
      margin: 0 auto;
      width: 80%;
    }
    
    .contact-form > * {
      display: block;
      padding: 0.5rem;
      margin: 0.5rem auto;
      width: 100%;
      outline: none;
    }
    
    .contact-form [required]:valid {
      border: thin solid var(--form-valid-color);
    }
    
    .contact-form [required]:invalid {
      border: thin solid var(--form-invalid-color);
    }
    
    .contact-form textarea {
      resize: none;
    }
    
    .contact-form legend,
    .form__response {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
    }
    
    .contact-form input,
    .contact-form textarea {
      font-family: sans-serif;
      font-size: 0.8rem;
    }
    
    .contact-form input[type="submit"] {
      width: 50%;
      cursor: pointer;
      border: thin solid var(--negro);
    }
    
    .contact-form-response-error {
      background-color: var(--form-invalid-color);
      color: var(--form-alert-letter-color);
      margin-top: -0.55rem;
      font-size: 70%;
    }
    
    .contact-form-response-error.showing {
      display: block;
      animation: show-message 1s 1 normal 0s ease-out both;
    }
    
    .form__loader {
      text-align: center;
    }
    
    .none {
      display: none;
    }

    @keyframes show-message {
      0% {
        visibility: hidden;
        opacity: 0;
      }
    
      100% {
        visibility: visible;
        opacity: 1;
      }
    }
    
  `
  );

  $form.classList.add("contact-form");

  $form.innerHTML = `
      <legend>Envía tu Comentarios</legend>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        title="Nombre solo acepta letras y espacios en blanco"
        pattern="^[a-zA-Zá-ü\\s]+$"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo Electronico"
        title="Email no es válido"
        pattern="^[_\\w\\d-]+(.[._\\w\\d-])*@[\\w\\d-]+(.[_\\w\\d-])*(.[\\w]{2,15})$"
        required
            />

      <input
        type="text"
        name="subject"
        placeholder="Asunto a tratar"
        title="El asunto es requerido"
        required
            />

      <textarea
        name="comments"
        cols="50"
        rows="5"
        placeholder="Escriba su mensaje..."
        title="Tu comentario no debe exceder los 255 caracteres"
        data-pattern="^(\\n|.){1,255}$"
        required
      ></textarea>

      <input type="submit" value="Enviar" />
      <div class="form__loader none">
        <img src="app/assets/three-dots.svg" alt="Loading" />
      </div>
      <div class="form__response none">
        <p>Los datos han sido enviados</p>
      </div>
    
    `;

  function validationsForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]");

    // console.log($inputs);

    $inputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");

      const $span = d.createElement("span");

      $span.setAttribute("id", input.name);
      $span.textContent = input.title;
      $span.classList.add("contact-form-response-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);

          return !regex.test($input.value)
            ? d.getElementById($input.name).classList.add("showing")
            : d.getElementById($input.name).classList.remove("showing");
        }

        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("showing")
            : d.getElementById($input.name).classList.remove("showing");
        }
      }
    });

    d.addEventListener("submit", async (e) => {
      e.preventDefault();
      alert("Enviando Formulario");

      const $loader = d.querySelector(".form__loader"),
        $response = d.querySelector(".form__response"),
        $textResponse = d.querySelector(".form__response p");

      $loader.classList.remove("none");

      try {
        let data = await fetch(
          "https://formsubmit.co/ajax/christiandoor.2001@gmail.com",
          {
            method: "POST",
            body: new FormData(e.target),
          }
        );
        if (!data.ok)
          throw { status: data.status, statusText: data.statusText };

        let json = await data.json();

        if (!json.err) {
          $loader.classList.add("none");
          $textResponse.textContent = json.message;
          $response.classList.remove("none");
          $form.reset();
        } else {
          $loader.classList.add("none");
          $textResponse.textContent = json.message;
          $response.classList.remove("none");
        }
      } catch (error) {
        let message = error.statusText || `Ocurrio un error`;
        $textResponse.textContent = `Error ${error.status}: ${message}`;
      } finally {
        setTimeout(() => {
          $response.classList.add("none");
          $textResponse.innerHTML = "";
        }, 5000);
      }
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}
