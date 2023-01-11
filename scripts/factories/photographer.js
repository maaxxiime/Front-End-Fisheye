// Balises sémentiques Header, Nav, Main, Section, Article, Aside, Footer
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/Sample/photographersIdPhotos/${portrait}`;

  function getUserCardDOM() {

    // DOM element
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const localisation = document.createElement("p");
    const tagLine = document.createElement("p");
    const prices = document.createElement("p");


    // Set attribute
    article.setAttribute('aria-label', `Photographe ${name}`)
    link.setAttribute("alt", name);
    link.setAttribute("href", `./photographer.html?id=${id}`)
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);


    // Text content
    h2.textContent = name;
    localisation.textContent = `${city}, ${country}`;
    tagLine.textContent = tagline;
    prices.textContent = `${price}€/jour`;

    // Appen child
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(localisation);
    article.appendChild(tagLine);
    article.appendChild(prices);

    return article;
  }
  return { name, picture, id, city, country, tagline, price, getUserCardDOM };
}
