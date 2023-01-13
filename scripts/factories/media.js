function factoryMedia(data) {
    if(data.image) {
        return image(data)
    } else {
        return video(data)
    }

}

function image(data) {
  const { photographerId, id, title, image, likes, date, price } = data;

  function display() {
    const h1 = document.createElement('h1')
    h1.textContent = "image"
    return h1
  }
  return { photographerId, id, title, image, likes, date, price, display };

}

function video(data) {
    const { photographerId, id, title, video, likes, date, price } = data;
  
    function display() {
        const h1 = document.createElement('h1')
        h1.textContent = "video"
        return h1
    }
    return { photographerId, id, title, video, likes, date, price, display };
  
  }