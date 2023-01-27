// Accessibilité
const modal = document.getElementById("contact_modal");
const params = window.location.href.split("=")[2].split("?")[0].replace("%20", " ").replace("%20", " ");
modal.setAttribute('aria-label', `contact me ${params}`);

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener("click", function closeModal(){
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
})

closeBtn.addEventListener("keypress", (e) => {
    const keyName = e.key;
    if (keyName === 'Enter') {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
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
