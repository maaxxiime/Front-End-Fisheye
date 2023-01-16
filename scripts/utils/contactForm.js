const form = document.getElementById('form')

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


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
