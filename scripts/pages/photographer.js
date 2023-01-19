async function userCardDom() {
  //récupérer le params passé en url
  const params = window.location.href.split("=")[1].split("?")[0];
  const ID = parseInt(params);

  //créer une variable user null
  // var user = null;
  // créer un tableau media vide
  let medias = [];

  async function getUser() {
    const select = document.getElementById("filter");
    // fetch la data
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    // const photographers = resultat.photographers;
    const mediasData = resultat.media;
    // user = photographers.filter((photographer) => photographer.id === ID)[0];
    const mediasUser = mediasData.filter((media) => media.photographerId === ID);
    
    select.addEventListener("change", function filter() {
      if (select.selectedIndex === 0) {
        console.log("popularité");
        medias.sort((a,b) => a.likes - b.likes)
      } else if (select.selectedIndex === 1) {
        console.log("date");
        medias.sort((a,b) => new Date(a.date) - new Date (b.date))
      } else {
        console.log("titre");
        medias.sort()
      }
    });
    
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

  await getUser();
  displayMedia();
  await displayUser();
}
userCardDom();
