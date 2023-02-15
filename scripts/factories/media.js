function factoryMedia(data) {
  if (data.image) {
    return image(data);
  } else {
    return video(data);
  }
}

let totalLike = null
const totalLikesCount = document.createElement("p");

async function displayInfos() {

  // récupére l'id du photographe passé dans l'URL
  const param = window.location.href.split("=")[1].split("?")[0];
  const ID = parseInt(param);
  
  
  const data = await fetch("../data/photographers.json");
  const resultat = await data.json();
  const photographers = resultat.photographers;
  const mediasData = resultat.media;
  // filtre la data des photographers et récupére les infos d'un photographer qui est identique à l'ID
  const user = photographers.filter((photographer) => photographer.id === ID)[0];
  // filtre la data des medias et récupére les media d'un photographer qui est identique à l'ID
  const mediasUser = mediasData.filter((media) => media.photographerId === ID);

  // tableau vide qui est ensuite incrémenté des likes du photographe via la boucle for
  let likesArray = []
  for(let i = 0 ; i < mediasUser.length ; i++) {
      let likes = mediasUser[i].likes
      likesArray.push(likes)
  }
  // calcul le nombre exact de likes avec la méthode reduce et l'assigne à totalLike
  totalLike = likesArray.reduce((a, b) => a + b)

  // DOM element
  const body = document.getElementById('body')
  const aside = document.createElement("aside");
  const divLike = document.createElement("div");
  const divPrice = document.createElement("div");
  const heart = document.createElement("img");
  const price = document.createElement("p");

  // set attribute & text content
  aside.setAttribute("class", "photograph-infos");
  totalLikesCount.textContent = totalLike;
  totalLikesCount.setAttribute("class", "like-count");
  heart.setAttribute("src", "./assets/icons/heart-solid.svg")
  heart.setAttribute("class", "heart-count");
  price.textContent = `${user.price}€ / jour`

  // appen child
  body.appendChild(aside)
  aside.appendChild(divLike)
  aside.appendChild(divPrice)
  divLike.appendChild(totalLikesCount)
  divLike.appendChild(heart)
  divPrice.appendChild(price)

}
displayInfos()

function image(data) {
  let { photographerId, id, title, image, likes, date, price } = data;
  // récupére juste le prénom du photographe, servira plus tard pour savoir dans quel dossier aller chercher les images
  const params = window.location.href.split("=")[2].split("%")[0];

  function display() {

    // DOM element
    const article = document.createElement("article");
    const divBottom = document.createElement("div");
    const img = document.createElement("img");
    const titleImage = document.createElement("p");
    const likesCount = document.createElement("p");
    const heart = document.createElement("img");

    // set attribute & text content
    divBottom.setAttribute("class", "div-bottom");
    img.setAttribute("tabindex", "0");
    img.setAttribute("src", `assets/Sample/${params}/${image}`);
    img.setAttribute("class", "photograph-image");
    img.setAttribute("alt", title);
    img.style.cursor = "pointer";
    titleImage.textContent = title;
    likesCount.textContent = likes;
    heart.setAttribute("src", "./assets/icons/heart-solid.svg");
    heart.setAttribute("tabindex", "0");
    heart.setAttribute("class", "heart-image");
    heart.setAttribute("alt", "likes");
    heart.setAttribute("aria-label", "likes");

    // appen child
    article.appendChild(img);
    article.appendChild(divBottom);
    divBottom.appendChild(titleImage);
    divBottom.appendChild(likesCount);
    divBottom.appendChild(heart);

    let maxLike = false
    heart.addEventListener("click", like);
    heart.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        like();
      }
    });
    function like() {
      if(maxLike === false) {
        likes += 1;
        likesCount.textContent = likes;
        totalLike += 1;
        totalLikesCount.textContent = totalLike
        maxLike = true;
      } else if (maxLike === true) {
        console.log("déjà liké")
      }
    }
    return article;
  }
  return { photographerId, id, title, image, likes, date, price, display };
}

function video(data) {
  let { photographerId, id, title, video, likes, date, price } = data;
  // récupére juste le prénom du photographe, servira plus tard pour savoir dans quel dossier aller chercher les images
  const params = window.location.href.split("=")[2].split("%")[0];

  function display() {

    // DOM element
    const article = document.createElement("article");
    const videos = document.createElement("video");
    const divBottom = document.createElement("div");
    const titleImage = document.createElement("p");
    const likesCount = document.createElement("p");
    const heart = document.createElement("img");

    // set attribute
    divBottom.setAttribute("class", "div-bottom");
    videos.setAttribute("src", `assets/Sample/${params}/${video}`);
    videos.setAttribute("tabindex", "0");
    videos.setAttribute("controls", true);
    videos.setAttribute("alt", title);
    videos.setAttribute("class", "photograph-video");
    videos.style.cursor = "pointer"
    titleImage.textContent = title;
    likesCount.textContent = likes;
    heart.setAttribute("src", "./assets/icons/heart-solid.svg");
    heart.setAttribute("tabindex", "0");
    heart.setAttribute("class", "heart-image");
    heart.setAttribute("alt", "likes");

    // appen child
    article.appendChild(videos);
    article.appendChild(divBottom);
    divBottom.appendChild(titleImage);
    divBottom.appendChild(likesCount);
    divBottom.appendChild(heart);

    let maxLike = false;
    heart.addEventListener("click", like);
    heart.addEventListener("keypress", (e) => {
      const keyName = e.key;
      if (keyName === "Enter") {
        like();
      }
    });
    function like() {
      if(maxLike === false) {
        likes += 1;
        likesCount.textContent = likes;
        totalLike += 1;
        totalLikesCount.textContent = totalLike
        maxLike = true;
      } else if (maxLike === true) {
        console.log("déjà liké")
      }
    }

    return article;
  }
  return { photographerId, id, title, video, likes, date, price, display };
}
