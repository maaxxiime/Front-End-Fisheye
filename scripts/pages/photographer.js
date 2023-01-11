async function getId() {
  //récupérer le params passé en url
  const ID = window.location.href.split("=")[1];

  //créer un tableau de photgraphe
  let photographers = [];

  // fetch la data
  return fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;

      //parcours le tableau photographers
      photographers.forEach((photographer) => {
        if (photographer.id == ID) {
          console.log(photographer);
          return photographer;
        }
      });
    });
}
getId();
