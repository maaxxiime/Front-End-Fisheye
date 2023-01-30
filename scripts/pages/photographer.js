async function userCardDom() {
  // récupére le select
  const select = document.getElementById("filter");
  //récupérer le params passé en url
  const params = window.location.href.split("=")[1].split("?")[0];
  const ID = parseInt(params);
  const gallery = document.getElementById("gallery");

  //créer une variable user null
  // var user = null;
  // créer un tableau media vide
  let medias = [];

  async function getUser() {
    // fetch la data
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    // const photographers = resultat.photographers;
    const mediasData = resultat.media;
    // user = photographers.filter((photographer) => photographer.id === ID)[0];
    const mediasUser = mediasData.filter(
      (media) => media.photographerId === ID
    );

    mediasUser.forEach((media) => {
      let _media = factoryMedia(media);
      medias.push(_media);
    });
  }
  function displayMedia() {
    const gallery = document.getElementById("gallery");
    medias.forEach((media) => {
      const resultat = media.display();
      gallery.appendChild(resultat);
    });
  }

  async function displayUser() {
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    const photographers = resultat.photographers;
    const user = photographers.filter(
      (photographer) => photographer.id === ID
    )[0];
    const picture = `assets/Sample/photographersIdPhotos/${user.portrait}`;

    const divCollumn = document.getElementById("divCollumn");
    const photographHeader = document.getElementById("photograph-header");
    const contactName = document.getElementById("contact-name");
    const name = document.createElement("h1");
    const localisation = document.createElement("p");
    const tagline = document.createElement("p");
    const img = document.createElement("img");

    name.textContent = user.name;
    localisation.textContent = `${user.city}, ${user.country}`;
    tagline.textContent = user.tagline;
    img.setAttribute("src", picture);
    img.setAttribute("alt", user.name);
    contactName.textContent = user.name;

    divCollumn.appendChild(name);
    divCollumn.appendChild(localisation);
    divCollumn.appendChild(tagline);
    photographHeader.appendChild(img);
  }

  select.addEventListener("change", function filter(e) {
    const critere = e.target.value;
    filterByCritere(critere);
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    displayMedia();
  });

  function filterByCritere(critere) {
    if (critere == "popularite") {
      medias.sort((a, b) => b.likes - a.likes);
    } else if (critere == "date") {
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (critere == "titre") {
      medias.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  gallery.addEventListener("click", function (e) {
    const modalSlider = document.getElementById("modal-slider");
    modalSlider.style.display = "flex";

    // variable global avec la position (index) de l'element clické
    const dataImage = [];
    medias.forEach((media) => {
      dataImage.push(media.image);
    });
    const dataName = e.target.currentSrc.split("/")[6];
    const index = dataImage.indexOf(dataName);

    // mettre la position de l'index dans les data-index

    const src = e.target.src;
    const container = document.getElementById("container-slider");
    const alt = e.target.alt;
    const title = document.createElement("p");
    title.setAttribute("class", "title-slider");
    title.textContent = alt;
    container.appendChild(title);

    if (e.target.nodeName == "IMG") {
      const img = document.createElement("img");
      img.setAttribute("src", src);
      container.appendChild(img);
    }
    if (e.target.nodeName == "VIDEO") {
      const video = document.createElement("video");
      video.setAttribute("src", src);
      container.appendChild(video);
    }

    const btnCloseModalSlider = document.getElementById("close");
    btnCloseModalSlider.addEventListener("click", function close() {
      modalSlider.style.display = "none";
      container.innerHTML = "";
    });
  });

  await getUser();
  displayMedia();
  await displayUser();
}
userCardDom();
// regarder propagation & bubling
