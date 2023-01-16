function factoryMedia(data) {
  if (data.image) {
    return image(data);
  } else {
    return video(data);
  }
}

function image(data) {
  const { photographerId, id, title, image, likes, date, price } = data;
  const params = window.location.href.split("=")[2].split("%")[0];

  function display() {
    const img = document.createElement("img");
    img.setAttribute("src", `assets/Sample/${params}/${image}`);
    return img;
  }
  return { photographerId, id, title, image, likes, date, price, display };
}

function video(data) {
  const { photographerId, id, title, video, likes, date, price } = data;
  const params = window.location.href.split("=")[2].split("%")[0];
  console.log(video)

  function display() {
    const video = document.createElement("video");
    video.setAttribute("src", `assets/Sample/${params}/${video}`);
    return video;
  }
  return { photographerId, id, title, video, likes, date, price, display };
}
