// fonction qui récupére la data du fichier JSON
async function getPhotographers() {
    return fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data);
}

async function init() {
  // créer un objet photographers qui contient tous les photographes
  const {photographers} = await getPhotographers();
  // passe en paramètre de la fonction displayData les photographes
  displayData(photographers);
}
init();


async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section"); 

  photographers.forEach((photographer) => {
    // pour chaque photographe, lance la fonction photographerFactory et getUserCardDOM puis appen child dans la photographersSection
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
