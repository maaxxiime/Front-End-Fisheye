async function userCardDom() {

  //récupére le params passé en url, ici c'est l'id que l'ont récupère
  const params = window.location.href.split("=")[1].split("?")[0];
  const ID = parseInt(params);
  // name me sert à trouver la bonne source lors d'un changement d'image au slider
  const name = window.location.href.split("=")[2].split("%")[0];
  const gallery = document.getElementById("gallery");

  // créer un tableau media vide
  let medias = [];

  async function getUser() {
    // fetch la data
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    const mediasData = resultat.media;
    // récupére les medias du photographe dont l'id est identique à l'ID
    const mediasUser = mediasData.filter(
      (media) => media.photographerId === ID
    );

    mediasUser.forEach((media) => {
      const _media = factoryMedia(media);
      medias.push(_media);
    });
  }

  function displayMedia() {
    const gallery = document.getElementById("gallery");
    medias.sort((a, b) => b.likes - a.likes);
    medias.forEach((media) => {
      // lance la fonction display dans le media factory pour chaque media
      const resultat = media.display();
      // appen child tout ce qui est créé de la fonction display dans gallery
      gallery.appendChild(resultat);
    });
  }
  function displayMediaSort() {
    const gallery = document.getElementById("gallery");
    medias.forEach((media) => {
      // lance la fonction display dans le media factory pour chaque media
      const resultat = media.display();
      // appen child tout ce qui est créé de la fonction display dans gallery
      gallery.appendChild(resultat);
    });
  }

  async function displayUser() {
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    const photographers = resultat.photographers;
    // récupére le photographe selon l'ID qui est en paramètre
    const user = photographers.filter(
      (photographer) => photographer.id === ID
    )[0];
    const picture = `assets/Sample/photographersIdPhotos/${user.portrait}`;

    // DOM element
    const divCollumn = document.getElementById("divCollumn");
    const photographHeader = document.getElementById("photograph-header");
    const contactName = document.getElementById("contact-name");
    const name = document.createElement("h1");
    const localisation = document.createElement("p");
    const tagline = document.createElement("p");
    const img = document.createElement("img");

    // set attribute & text content
    name.textContent = user.name;
    localisation.textContent = `${user.city}, ${user.country}`;
    tagline.textContent = user.tagline;
    img.setAttribute("src", picture);
    img.setAttribute("alt", user.name);
    contactName.textContent = user.name;

    // appen child
    divCollumn.appendChild(name);
    divCollumn.appendChild(localisation);
    divCollumn.appendChild(tagline);
    photographHeader.appendChild(img);
  }
  
  // récupére le select
  const select = document.getElementById("filter");
  // créer un eventListener sur le select et si il y a un changement, lance la fonction filter
  select.addEventListener("change", function filter(e) {
    const critere = e.target.value
    // lance la fonction filterByCritere et passe en paramètre le critere
    filterByCritere(critere);
    const gallery = document.getElementById("gallery");
    // vide la gallery puis la reconstruit selon la fonction filterByCritere(critere)
    gallery.innerHTML = "";
    displayMediaSort();
  });

  function filterByCritere(critere) {
    if (critere == "popularite") {
      // tri du plus like au moins like
      medias.sort((a, b) => b.likes - a.likes);
    } else if (critere == "date") {
      // tri du plus récent au plus anciens
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (critere == "titre") {
      // tri par ordre alphabétique
      medias.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  // créer un eventListenner et au click lance la fonction slider
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


    // si l'element clické dans la galerie == img ou video, ouvre le slider
    if (
      (e.target.nodeName == "IMG" &&
        e.target.className == "photograph-image") ||
      (e.target.nodeName == "VIDEO" &&
        e.target.className == "photograph-video")) 
   {
      modalSlider.style.display = "flex";

      for(let i = 0 ; i < dataImg[0].length ; i++) {
        imgs[i].setAttribute("tabindex", -1);
      }
      for(let i = 0 ; i < dataVideos[0].length ; i++) {
        videos[i].setAttribute("tabindex", -1);
      }
      for(let i = 0 ; i < dataHeart[0].length ; i++) {
        heart[i].setAttribute("tabindex", -1);
      }
      filter.setAttribute("tabindex", -1);
      contact.setAttribute("tabindex", -1);

    // créer des tableaux vide pour les images, video et titre (alt)
    const dataImage = [];
    const dataVideo = [];
    const dataAlt = [];

    // push les images / vidéos ou titre dans le tableau correspondant
    medias.forEach((media) => {
      dataImage.push(media.image);
      dataVideo.push(media.video);
      dataAlt.push(media.title);
    });
    
    const filteredDataImage = dataImage.filter(function(x) {
      return x !== undefined;
    });
    const filteredDataVideo = dataVideo.filter(function(x) {
      return x !== undefined;
    });
    
    // join les deux tableaux pour en faire qu'un seul
    const fullDataArray = filteredDataVideo.concat(filteredDataImage);
    // sert à récupérer le nom de la data (ex: sport_water_tunnel.jpg)
    const dataName = e.target.src.split("/")[6];
    // variable global avec la position (index) de l'element clické
    let index = fullDataArray.indexOf(dataName);
    
    let newSrc = null;

    const src = e.target.src;
    const alt = e.target.alt;
    const container = document.getElementById("container-slider");
    const title = document.createElement("p");
    let img = document.createElement("img");
    let video = document.createElement("video");
    title.setAttribute("class", "title-slider");
    title.textContent = alt;
    container.appendChild(title);

    // créer le slider avec une image ou une vidéo selon la target
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

    // eventListener pour lancer la fonction closeSlider au click sur la croix ou press sur entrée
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
      for(let i = 0 ; i < dataImg[0].length ; i++) {
        imgs[i].setAttribute("tabindex", 0);
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

    // eventListener pour lancer la fonction previousSlider au click sur la "<" ou press sur entrée
    const previous = document.getElementById("previous");
    previous.addEventListener("click", previousSlider);
    previous.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        previousSlider();
      }
    });
    function previousSlider() {
      
      // vide le container
      container.innerHTML = "";
      // baisse l'index
      index -= 1;
      // si l'index arrive à -1, ça le remet à l'index le plus haut
      if (index === -1) {
        index = fullDataArray.length -1;
      }
      // change la source selon l'index (ex: index === 8, l'index 8 === "climber.jpg") donc newSrc = climber.jpg
      newSrc = fullDataArray[index];

      // si newSrc fini par ".jpg" alors ça construit une image
      if (newSrc.split(".")[1] === "jpg") {
        img.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        container.appendChild(img);
      }

      // si newSrc fini par ".mp4" alors ça construit une vidéo
      if (newSrc.split(".")[1] === "mp4") {
        video.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        video.setAttribute("autoplay", true);
        video.setAttribute("controls", true);
        container.appendChild(video);
      }

      // vide le textContent de title puis l'incrémente du nouveau alt de l'image correspondant à l'index
      title.textContent = "";
      title.textContent = dataAlt[index];
      container.appendChild(title);
    }

    // eventListener pour lancer la fonction nextSlider au click sur la ">" ou press sur entrée
    const next = document.getElementById("next");
    next.addEventListener("click", nextSlider);
    next.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        nextSlider();
      }
    });
    function nextSlider() {
      
      // vide le container
      container.innerHTML = "";
      // monte l'index
      index += 1;
      // si l'index arrive au maximum, ça le remet à 0
      if (index === fullDataArray.length) {
        index = 0;
      }

      // change la source selon l'index (ex: index === 8, l'index 8 === "climber.jpg") donc newSrc = climber.jpg
      newSrc = fullDataArray[index];

      // si newSrc fini par ".jpg" alors ça construit une image
      if (newSrc.split(".")[1] === "jpg") {
        img.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        container.appendChild(img);
      }

      // si newSrc fini par ".mp4" alors ça construit une vidéo
      if (newSrc.split(".")[1] === "mp4") {
        video.setAttribute("src", `./assets/Sample/${name}/${newSrc}`);
        video.setAttribute("autoplay", true);
        video.setAttribute("controls", true);
        container.appendChild(video);
      }

      // vide le textContent de title puis l'incrémente du nouveau alt de l'image correspondant à l'index
      title.textContent = "";
      title.textContent = dataAlt[index];
      container.appendChild(title);
    }
  }
  }

  await getUser();
  displayMedia();
  await displayUser();
}
userCardDom();