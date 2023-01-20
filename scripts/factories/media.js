function factoryMedia(data) {
  if (data.image) {
    return image(data);
  } else {
    return video(data);
  }
}

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

    // faire un boolean plutot que ça
    let maxLike = 0
    heart.addEventListener("click", function like() {

      if(maxLike === 0) {
        likes += 1;
        likesCount.textContent = likes;
        maxLike = 1;
      } else if (maxLike === 1) {
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

    divBottom.setAttribute("class", "div-bottom");
    videos.setAttribute("src", `assets/Sample/${params}/${video}`);
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

    let maxLike = 0
    heart.addEventListener("click", function like() {

      if(maxLike === 0) {
        likes += 1;
        likesCount.textContent = likes;
        maxLike = 1;
        
      } else if (maxLike === 1) {
        console.log("deja like")
      }
    });

    return article;
  }
  return { photographerId, id, title, video, likes, date, price, display };
}
