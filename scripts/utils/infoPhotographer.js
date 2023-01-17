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
    
    const like = likesArray.reduce((a, b) => a + b)


    const body = document.getElementById('body')
    const aside = document.createElement("aside");
    const divLike = document.createElement("div");
    const divPrice = document.createElement("div");
    const likesCount = document.createElement("p");
    const heart = document.createElement("img");
    const price = document.createElement("p");

    aside.setAttribute("class", "photograph-infos");
    likesCount.textContent = like;
    likesCount.setAttribute("class", "like-count");
    heart.setAttribute("src", "./assets/icons/heart-solid.svg")
    heart.setAttribute("class", "heart-count");
    price.textContent = `${user.price}€ / jour`

    body.appendChild(aside)
    aside.appendChild(divLike)
    aside.appendChild(divPrice)
    divLike.appendChild(likesCount)
    divLike.appendChild(heart)
    divPrice.appendChild(price)

}
displayInfos()
