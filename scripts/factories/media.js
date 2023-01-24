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

  const param = window.location.href.split("=")[1].split("?")[0];
  const ID = parseInt(param);
  
  
  const data = await fetch("../data/photographers.json");
  const resultat = await data.json();
  const photographers = resultat.photographers;
  const mediasData = resultat.media;
  const user = photographers.filter((photographer) => photographer.id === ID)[0];
  const mediasUser = mediasData.filter((media) => media.photographerId === ID);

  let likesArray = []

  for(let i = 0 ; i < mediasUser.length ; i++) {
      let likes = mediasUser[i].likes
      likesArray.push(likes)
  }
  
  totalLike = likesArray.reduce((a, b) => a + b)

  const body = document.getElementById('body')
  const aside = document.createElement("aside");
  const divLike = document.createElement("div");
  const divPrice = document.createElement("div");
  const heart = document.createElement("img");
  const price = document.createElement("p");

  aside.setAttribute("class", "photograph-infos");
  totalLikesCount.textContent = totalLike;
  totalLikesCount.setAttribute("class", "like-count");
  heart.setAttribute("src", "./assets/icons/heart-solid.svg")
  heart.setAttribute("class", "heart-count");
  price.textContent = `${user.price}€ / jour`

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
  const params = window.location.href.split("=")[2].split("%")[0];

  function display() {
    const article = document.createElement("article");
    const divBottom = document.createElement("div");
    const img = document.createElement("img");
    const titleImage = document.createElement("p");
    const likesCount = document.createElement("p");
    const heart = document.createElement("img");

    article.setAttribute("tabindex", "0");
    divBottom.setAttribute("class", "div-bottom");
    img.setAttribute("src", `assets/Sample/${params}/${image}`);
    img.setAttribute("class", "photograph-image");
    img.setAttribute("alt", title);
    titleImage.textContent = title;
    likesCount.textContent = likes;
    heart.setAttribute("src", "./assets/icons/heart-solid.svg");
    heart.setAttribute("class", "heart-image");
    heart.setAttribute("alt", "likes");

    article.appendChild(img);
    article.appendChild(divBottom);
    divBottom.appendChild(titleImage);
    divBottom.appendChild(likesCount);
    divBottom.appendChild(heart);

    let maxLike = false
    heart.addEventListener("click", function like() {

      if(maxLike === false) {
        likes += 1;
        likesCount.textContent = likes;
        totalLike += 1;
        totalLikesCount.textContent = totalLike
        maxLike = true;
      } else if (maxLike === true) {
        console.log("déjà liké")
      }
    });
    return article;
  }
  return { photographerId, id, title, image, likes, date, price, display };
}

function video(data) {
  let { photographerId, id, title, video, likes, date, price } = data;
  const params = window.location.href.split("=")[2].split("%")[0];

  function display() {
    const article = document.createElement("article");
    const videos = document.createElement("video");
    const divBottom = document.createElement("div");
    const titleImage = document.createElement("p");
    const likesCount = document.createElement("p");
    const heart = document.createElement("img");

    article.setAttribute("tabindex", "0");
    divBottom.setAttribute("class", "div-bottom");
    videos.setAttribute("src", `assets/Sample/${params}/${video}`);
    videos.setAttribute("controls", true);
    videos.setAttribute("class", "photograph-video");
    titleImage.textContent = title;
    likesCount.textContent = likes;
    heart.setAttribute("src", "./assets/icons/heart-solid.svg");
    heart.setAttribute("class", "heart-image");

    article.appendChild(videos);
    article.appendChild(divBottom);
    divBottom.appendChild(titleImage);
    divBottom.appendChild(likesCount);
    divBottom.appendChild(heart);

    let maxLike = false;
    heart.addEventListener("click", function like() {

      if(maxLike === false) {
        likes += 1;
        likesCount.textContent = likes;
        totalLike += 1;
        totalLikesCount.textContent = totalLike
        maxLike = true;
        
      } else if (maxLike === true) {
        console.log("déjà liké")
      }
    });

    return article;
  }
  return { photographerId, id, title, video, likes, date, price, display };
}
