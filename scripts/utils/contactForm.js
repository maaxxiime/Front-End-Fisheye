// Accessibilité
const modal = document.getElementById("contact_modal");
const params = window.location.href.split("=")[2].split("?")[0].replace("%20", " ").replace("%20", " ");
modal.setAttribute('aria-label', `contact me ${params}`);

const header = document.getElementById('header');
const main = document.getElementById('main');
const realisation = document.getElementById('realisation');
const filter = document.getElementById('filter');
const gallery = document.getElementById('gallery');



function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    realisation.setAttribute("aria-hidden", "true");
    filter.setAttribute("aria-hidden", "true");
    gallery.setAttribute("aria-hidden", "true");
}

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener("click", function closeModal(){
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    realisation.setAttribute("aria-hidden", "false");
    filter.setAttribute("aria-hidden", "false");
    gallery.setAttribute("aria-hidden", "false");
})

closeBtn.addEventListener("keypress", (e) => {

    const keyName = e.key;

    if (keyName === 'Enter') {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
        header.setAttribute("aria-hidden", "false");
        main.setAttribute("aria-hidden", "false");
        realisation.setAttribute("aria-hidden", "false");
        filter.setAttribute("aria-hidden", "false");
        gallery.setAttribute("aria-hidden", "false");
    }

})


const form = document.getElementById('form')
form.addEventListener("submit", function sendForm(e){
    e.preventDefault();
    
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    let res = null

    if(prenom != "" && nom!= "" && email != "" && message != "" && email.includes('@') && email.includes('.')) {
        res = {
            prenom: prenom,
            nom: nom,
            email: email,
            message: message
        }

        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";

        form.reset()

    } else {
        res = "erreur"
    }


    console.log(res)
})
