const modal = document.getElementById("contact_modal");
const formData = document.querySelectorAll(".formData");
// params donne le nom et le prénom avec des espaces entre chaque
const params = window.location.href
  .split("=")[2]
  .split("?")[0]
  .replace("%20", " ")
  .replace("%20", " ");
modal.setAttribute("aria-label", `contact me ${params}`);

// cette suite sert pour récupérer tous les éléments à mettre en tabindex 0 / -1 selon la situation
const img = document.getElementsByClassName('photograph-image');
const videos = document.getElementsByClassName('photograph-video');
const heart = document.getElementsByClassName('heart-image');
const filter = document.getElementById('filter');
const contact = document.getElementById('contact-me');
const dataImg = []
const dataVideos = []
const dataHeart = []
dataImg.push(img)
dataVideos.push(videos)
dataHeart.push(heart)


function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  // en ouvrant la modale, passe les tab index à -1 pour qu'ils ne soient pas focusable
  for(let i = 0 ; i < dataImg[0].length ; i++) {
    img[i].setAttribute("tabindex", -1);
  }
  for(let i = 0 ; i < dataVideos[0].length ; i++) {
    videos[i].setAttribute("tabindex", -1);
  }
  for(let i = 0 ; i < dataHeart[0].length ; i++) {
    heart[i].setAttribute("tabindex", -1);
  }
  filter.setAttribute("tabindex", -1);
  contact.setAttribute("tabindex", -1);
}

const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("keypress", (e) => {
  const keyName = e.key;
  if (keyName === "Enter") {
    closeModal()
  }
});
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  // en fermant la modale, passe les tab index à 0 pour qu'ils soient focusable
  for(let i = 0 ; i < dataImg[0].length ; i++) {
    img[i].setAttribute("tabindex", 0);
  }
  for(let i = 0 ; i < dataVideos[0].length ; i++) {
    videos[i].setAttribute("tabindex", 0);
  }
  for(let i = 0 ; i < dataHeart[0].length ; i++) {
    heart[i].setAttribute("tabindex", 0);
  }
  filter.setAttribute("tabindex", 0);
  contact.setAttribute("tabindex", 0);
}

const form = document.getElementById("form");
form.addEventListener("submit", function sendForm(e) {

  // empêche l'événnement par défaut, c'est-à-dire de recharger la page et de passer en paramètre le formulaire
  e.preventDefault();

  // récupére toutes les values des inputs
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // créer des let pour savoir si un input est valide ou non, de base ils ne sont pas valide
  let prenomIsValide = false;
  let nomIsValide = false;
  let emailIsValide = false;
  let messageIsValide = false;
  
  let res = null;

  // vérifie que le prénom est supérieur à une lettre et qu'il ne s'agit pas d'espace
  if (prenom.length < 2 || prenom == "") {
    // passe le dataset en true
    formData[0].dataset.errorVisible = true;
    // passe le valide en false
    prenomIsValide = false;
  } else {
    console.log("Prénom à deux");
    // passe le dataset en false
    formData[0].dataset.errorVisible = false;
    // passe le valide en true
    prenomIsValide = true;
  }

  // vérifie que le nom est supérieur à une lettre et qu'il ne s'agit pas d'espace
  if (nom.length < 2 || nom == "") {
    formData[1].dataset.errorVisible = true;
    nomIsValide = false;
  } else {
    console.log("Nom à deux");
    formData[1].dataset.errorVisible = false;
    nomIsValide = true;
  }

  // vérifie que l'email contient bien un @ et un . et qu'il fait au minimum 6 caratères (ex: m@o.fr)
  if (email.includes("@") && email.includes(".") && email.length >= 6) {
    console.log("Email valide");
    formData[2].dataset.errorVisible = false;
    emailIsValide = true;
  } else {
    formData[2].dataset.errorVisible = true;
    emailIsValide = false;
  }

  // vérifie que le message n'est pas uniquement des espaces vides
  if (message == "") {
    formData[3].dataset.errorVisible = true;
    messageIsValide = false;
  } else {
    console.log("message valide");
    formData[3].dataset.errorVisible = false;
    messageIsValide = true;
  }

  // si tous les "inputIsValide" sont en true alors incrémente l'objet res créé plus tôt et assigne la valeur à la clé
  // sinon passe dans le else
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

    // reset les inputs du formulaire et met lance la fonction closeModal
    form.reset();
    closeModal()

  } else {
    res = "erreur";
  }
  console.log(res);
});
