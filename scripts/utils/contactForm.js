// Accessibilité
const modal = document.getElementById("contact_modal");
const formData = document.querySelectorAll(".formData");
const params = window.location.href
  .split("=")[2]
  .split("?")[0]
  .replace("%20", " ")
  .replace("%20", " ");
modal.setAttribute("aria-label", `contact me ${params}`);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
});

closeBtn.addEventListener("keypress", (e) => {
  const keyName = e.key;
  if (keyName === "Enter") {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }
});

const form = document.getElementById("form");
form.addEventListener("submit", function sendForm(e) {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  let prenomIsValide = false;
  let nomIsValide = false;
  let emailIsValide = false;
  let messageIsValide = false;

  let res = null;

  if (prenom.length < 2 || prenom == "") {
    formData[0].dataset.errorVisible = true;
    prenomIsValide = false;
  } else {
    console.log("Prénom à deux");
    formData[0].dataset.errorVisible = false;
    prenomIsValide = true;
  }

  if (nom.length < 2 || nom == "") {
    formData[1].dataset.errorVisible = true;
    nomIsValide = false;
  } else {
    console.log("Nom à deux");
    formData[1].dataset.errorVisible = false;
    nomIsValide = true;
  }

  if (email.includes("@") && email.includes(".") && email.length >= 6) {
    console.log("Email valide");
    formData[2].dataset.errorVisible = false;
    emailIsValide = true;
  } else {
    formData[2].dataset.errorVisible = true;
    emailIsValide = false;
  }
  if (message == "") {
    formData[3].dataset.errorVisible = true;
    messageIsValide = false;
  } else {
    console.log("message valide");
    formData[3].dataset.errorVisible = false;
    messageIsValide = true;
  }


  if (
    prenomIsValide === true &&
    nomIsValide === true &&
    emailIsValide === true &&
    messageIsValide === true
  ) {
    res = {
      prenom: prenom,
      nom: nom,
      email: email,
      message: message,
    };

    form.reset();
    modal.style.display = "none";

  } else {
    res = "erreur";
  }
  console.log(res);
});
