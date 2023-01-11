function getId() {
  //récupérer le params passé en url
  const params = window.location.href.split("=")[1];
  const ID = parseInt(params);

  //créer un tableau de photgraphe
  let photographers = [];

  // fetch la data
  return fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;

      //parcours le tableau photographers
      photographers.forEach((photographer) => {
        if (photographer.id === ID) {


          const picture = `assets/Sample/photographersIdPhotos/${photographer.portrait}`;
          const section = document.querySelector(".photograph-header");
          const divFlex = document.createElement("div");
          const title = document.createElement("h1");
          const localisation = document.createElement("p");
          const tagLine = document.createElement("p");
          const img = document.createElement("img");


          divFlex.setAttribute('class', "divCollumn")


          title.textContent = photographer.name;
          localisation.textContent = `${photographer.city}, ${photographer.country}`;
          tagLine.textContent = photographer.tagline;
          img.setAttribute("src", picture);


          section.appendChild(divFlex);
          divFlex.appendChild(title);
          divFlex.appendChild(localisation);
          divFlex.appendChild(tagLine);
          section.appendChild(img);

          return photographer;
        }
      });
    });
}
getId();
