async function userCardDom() {
  //récupérer le params passé en url
  const params = window.location.href.split("=")[1];
  const ID = parseInt(params);

  //créer un objet user
  let user = null
  let medias = []
  

  async function getUser(){

    // fetch la data
    const data = await fetch("../data/photographers.json");
    const resultat = await data.json();
    const photographers = resultat.photographers
    const mediasData = resultat.media;
    user = photographers.filter((photographer) => photographer.id === ID)[0];
    const mediasUser = mediasData.filter((media)=> media.photographerId === ID);
    mediasUser.forEach((media) =>{
      let _media = factoryMedia(media)
      medias.push(_media)
    })
  }
  function displayMedia() {

    const gallery = document.getElementById('gallery');
    medias.forEach((media)=> {
      const resultat = media.display()
      gallery.appendChild(resultat)
    })
  }
  await getUser()
  displayMedia()
}
userCardDom();
