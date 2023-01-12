// Balises sémentiques Header, Nav, Main, Section, Article, Aside, Footer
function realisationFactory() {
  const params = window.location.href.split("=")[1];
  const ID = parseInt(params);

  //créer un tableau des images
  let pictures = [];

  // fetch la data
  return fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {

      const photographers = data.photographers;
      photographers.forEach((photographer) => {
        if (photographer.id === ID) {

          const name = photographer.name.split(" ")[0];

          pictures = data.media;
          
          // parcours le tableau des images
          pictures.forEach((picture) => {
            if (picture.photographerId === ID) {
              
              console.log(picture)
              
              const images = `assets/Sample/${name}/${picture.image}`;
              const videos = `assets/Sample/${name}/${picture.video}`;

              const gallery = document.getElementById('gallery')
              const img = document.createElement('img')
              const video = document.createElement('video')

              img.setAttribute('alt', picture.title)
              img.setAttribute("src", images);
              video.setAttribute("src", videos)

              gallery.appendChild(img);
              gallery.appendChild(video)


            }
          });
        }
      });
    });
}
realisationFactory();
