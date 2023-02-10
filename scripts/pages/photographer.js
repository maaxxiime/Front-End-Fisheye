async function userCardDom() {
  // récupére le select
  const select = document.getElementById("filter");
  //récupérer le params passé en url
  const params = window.location.href.split("=")[1].split("?")[0];
  // name me sert à trouver la bonne source lors d'un changement d'image au slider
  const name = window.location.href.split("=")[2].split("%")[0];
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
    const mediasData = resultat.media;
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

  gallery.addEventListener("click", slider);
  gallery.addEventListener("keypress", (e) => {
    const keyName = e.key;
    if (keyName === "Enter") {
      slider(e);
    }
  });
  function slider(e) {
    const modalSlider = document.getElementById("modal-slider");

    // cette suite sert pour récupérer tous les éléments à mettre en tabindex 0 / -1 selon la situation
    const imgs = document.getElementsByClassName("photograph-image");
    const videos = document.getElementsByClassName("photograph-video");
    const heart = document.getElementsByClassName("heart-image");
    const filter = document.getElementById("filter");
    const contact = document.getElementById("contact-me");
    const dataImg = [];
    const dataVideos = [];
    const dataHeart = [];
    dataImg.push(imgs);
    dataVideos.push(videos);
    dataHeart.push(heart);

    // si e.target == img ou video, ouvre le slider
    if (
      (e.target.nodeName == "IMG" &&
        e.target.className == "photograph-image") ||
      e.target.nodeName == "VIDEO"
    ) {
      modalSlider.style.display = "flex";

      for (let i = 0; i < dataImg[0].length; i++) {
        imgs[i].setAttribute("tabindex", -1);
      }
      for (let i = 0; i < dataVideos[0].length; i++) {
        videos[i].setAttribute("tabindex", -1);
      }
      for (let i = 0; i < dataHeart[0].length; i++) {
        heart[i].setAttribute("tabindex", -1);
      }
      filter.setAttribute("tabindex", -1);
      contact.setAttribute("tabindex", -1);
    }
    console.log(e.target);

    // créer des tableaux vide pour les images, video et titre (alt)
    const dataImage = [];
    const dataVideo = [];
    const dataAlt = [];

    medias.forEach((media) => {
      dataImage.push(media.image);
      dataVideo.push(media.video);
      dataAlt.push(media.title);
    });

    function removeValue(value, index, arr) {
      // si une valeur d'un tableau correspond à undefined
      if (value === undefined) {
        // retire cette valeur du tableau d'origine
        arr.splice(index, dataImage.length);
        return true;
      }
      return false;
    }

    // passe la function removeValue à une methode filter sur les tableaux pour enlever les "undefined"
    const x = dataImage.filter(removeValue);
    const y = dataVideo.filter(removeValue);

    // join les deux tableau pour en faire qu'un seul
    const fullDataArray = dataImage.concat(dataVideo);

    // variable global avec la position (index) de l'element clické
    const dataName = e.target.src.split("/")[6];
    let index = fullDataArray.indexOf(dataName);

    let newSrc = null;

    const src = e.target.src;
    const container = document.getElementById("container-slider");
    const alt = e.target.alt;
    const title = document.createElement("p");
    title.setAttribute("class", "title-slider");
    title.textContent = alt;
    container.appendChild(title);

    let img = document.createElement("img");
    let video = document.createElement("video");
    if (e.target.nodeName == "IMG") {
      img.setAttribute("src", src);
      container.appendChild(img);
    }
    if (e.target.nodeName == "VIDEO") {
      video.setAttribute("src", src);
      video.setAttribute("autoplay", true);
      video.setAttribute("controls", true);
      container.appendChild(video);
    }

    const btnCloseModalSlider = document.getElementById("close");
    btnCloseModalSlider.addEventListener("click", closeSlider);
    btnCloseModalSlider.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        closeSlider();
      }
    });
    function closeSlider() {
      modalSlider.style.display = "none";
      container.innerHTML = "";
      for (let i = 0; i < dataImg[0].length; i++) {
        imgs[i].setAttribute("tabindex", 0);
      }
      for (let i = 0; i < dataVideos[0].length; i++) {
        videos[i].setAttribute("tabindex", 0);
      }
      for (let i = 0; i < dataHeart[0].length; i++) {
        heart[i].setAttribute("tabindex", 0);
      }
      filter.setAttribute("tabindex", 0);
      contact.setAttribute("tabindex", 0);
    }

    const previous = document.getElementById("previous");
    previous.addEventListener("click", previousSlider);
    previous.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        previousSlider();
      }
    });
    function previousSlider() {
      container.innerHTML = "";
      index -= 1;
      if (index === -1) {
        index = fullDataArray.length - 1;
      }
      newSrc = fullDataArray[index];

      if (newSrc.split(".")[1] === "jpg") {
        img.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        container.appendChild(img);
      }

      if (newSrc.split(".")[1] === "mp4") {
        video.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        video.setAttribute("autoplay", true);
        video.setAttribute("controls", true);
        container.appendChild(video);
      }

      title.textContent = "";
      title.textContent = dataAlt[index];
      container.appendChild(title);
    }

    const next = document.getElementById("next");
    next.addEventListener("click", nextSlider);
    next.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        nextSlider();
      }
    });
    function nextSlider() {
      container.innerHTML = "";
      index += 1;
      if (index === fullDataArray.length) {
        index = 0;
      }
      newSrc = fullDataArray[index];

      if (newSrc.split(".")[1] === "jpg") {
        img.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        container.appendChild(img);
      }

      if (newSrc.split(".")[1] === "mp4") {
        video.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        video.setAttribute("autoplay", true);
        video.setAttribute("controls", true);
        container.appendChild(video);
      }

      title.textContent = "";
      title.textContent = dataAlt[index];
      container.appendChild(title);
    }
  }

  await getUser();
  displayMedia();
  await displayUser();
}
userCardDom();
// regarder propagation & bubling
