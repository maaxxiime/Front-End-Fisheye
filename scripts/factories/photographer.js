// Balises sémentiques Header, Nav, Main, Section, Article, Aside, Footer
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/Sample/photographersIdPhotos/${portrait}`;
    console.log(data)

    function getUserCardDOM() {

        // DOM element
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const localisation = document.createElement('p');
        const tagLine = document.createElement('p');
        const prices = document.createElement('p');


        img.setAttribute("src", picture)
        img.setAttribute('alt', `lien vers la page du photographe ${name}`)
        h2.textContent = name;
        localisation.textContent = `${city}, ${country}`;
        tagLine.textContent = tagline;
        prices.textContent = `${price}€/jour`


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation)
        article.appendChild(tagLine)
        article.appendChild(prices)
        return (article);
    }
    return { name, picture, id, city, country, tagline, price, getUserCardDOM }
}