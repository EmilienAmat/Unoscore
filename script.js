// Variables globales
const optionsHTML = `
    <div class="settingList">
        <a id="suppJoueur" href="#">Supprimer</a>
        <a id="RenommerJoueur" href="#">Renommer</a>
    </div>
`;

const optionLogo = `
    <a href="#"><img src="settingLogo.png" class="settingLogo" alt=""></a>
`;

// Fonction pour gérer les clics sur les boutons "Supprimer" et "Renommer"
function gererOptions(event) {
    event.preventDefault();
    const bouton = event.target;
    if (bouton.classList.contains('settingLogo')) {
        bouton.insertAdjacentHTML('beforebegin', optionsHTML);
        bouton.remove();
        supprimerJoueur();
        modifierNom();
    }
}

// Fonction pour supprimer un joueur
function supprimerJoueur() {
    document.getElementById("suppJoueur").addEventListener('click', (e) => {
        e.preventDefault();
        const elementParent = e.target.closest('.joueurs');
        if (elementParent) {
            elementParent.remove();
        }
    });
}

// Fonction pour modifier le nom d'un joueur
function modifierNom() {
    document.getElementById("RenommerJoueur").addEventListener('click', (e) => {
        e.preventDefault();
        let newNom = prompt("Ajoute le nom du joueur :)");
        if (newNom) {
            const listOption = document.querySelector('.settingList');
            const elementParent = e.target.closest('.joueurs');
            const ancienNom = elementParent.querySelector('.NomsJoueurs');
            if (ancienNom) {
                ancienNom.textContent = newNom;
                listOption.insertAdjacentHTML('beforebegin', optionLogo);
                listOption.remove();
                reaffecterBoutons();
            }
        }
    });
}

// Fonction pour réaffecter les gestionnaires de boutons
function reaffecterBoutons() {
    document.querySelectorAll(".settingLogo").forEach(bouton => {
        bouton.removeEventListener('click', gererOptions); // Retirer l'ancien gestionnaire
        bouton.addEventListener('click', gererOptions); // Ajouter le nouveau gestionnaire
    });
}

// Calculatrice pour ajouter un nombre
function ajouterChiffre(event) {
    event.preventDefault();
    let joueurConcerne = event.target.closest('.joueurs');
    let inputNombre = joueurConcerne.querySelector('.Input');
    let scoreFinal = joueurConcerne.querySelector('.totalScore');

    let nombreInscrit = parseInt(inputNombre.value, 10);
    if (isNaN(nombreInscrit) || nombreInscrit === '') {
        alert("Veuillez entrer un nombre valide.");
        return; // Sortir de la fonction si l'entrée n'est pas un nombre
    }

    let score = parseInt(scoreFinal.textContent, 10);
    score += nombreInscrit;
    scoreFinal.textContent = score;
    inputNombre.value = '';
}

// Calculatrice pour soustraire un nombre
function soustraireChiffre(event) {
    event.preventDefault();
    let joueurConcerne = event.target.closest('.joueurs');
    let inputNombre = joueurConcerne.querySelector('.Input');
    let scoreFinal = joueurConcerne.querySelector('.totalScore');

    let nombreInscrit = parseInt(inputNombre.value, 10);
    if (isNaN(nombreInscrit) || nombreInscrit === '') {
        alert("Veuillez entrer un nombre valide.");
        return; // Sortir de la fonction si l'entrée n'est pas un nombre
    }

    let score = parseInt(scoreFinal.textContent, 10);
    score -= nombreInscrit;
    if (score < 0) {
        score = 0; // Empêcher le score d'être négatif
    }
    scoreFinal.textContent = score;
    inputNombre.value = '';
}

// Ajouter un joueur
function ajoutJoueur(e) {
    e.preventDefault();
    let joueurs = document.querySelectorAll(".joueurs");
    let nouveauJoueur = joueurs.length + 1;
    let elementParent = document.getElementById("bodyScore");

    const joueurHTML = `
        <a href="#"><img src="settingLogo.png" class="settingLogo" alt=""></a>
        <p class="NomsJoueurs">Nom Joueur ${nouveauJoueur}</p>
        <form action="#">
            <label for="scoreInput"></label>
            <input class="Input" type="number" placeholder="ici">
        </form>
        <a href="#"><img src="add.png" class="LogoAdd" alt=""></a>
        <a href="#"><img src="subtract.png" class="LogoSub" alt=""></a>
        <p class="totalScore">000</p>
    `;
    let noeudHTML = document.createElement('div');
    noeudHTML.setAttribute("id", `joueur${nouveauJoueur}`);
    noeudHTML.setAttribute("class", "joueurs");
    noeudHTML.innerHTML = joueurHTML;
    elementParent.appendChild(noeudHTML);

    reaffecterBoutons();
    document.querySelectorAll(".LogoAdd").forEach(button => {
        button.addEventListener('click', ajouterChiffre);
    });
    document.querySelectorAll(".LogoSub").forEach(button => {
        button.addEventListener('click', soustraireChiffre);
    });
}

// Fonction pour empêcher l'envoi du formulaire avec la touche "Entrée"
function desactiverToucheEntrer(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêcher l'action par défaut de la touche "Entrée"
    }
}

// Ajouter la gestion de la touche "Entrée" à tous les formulaires de score
function ajouterGestionToucheEntrer() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('keydown', desactiverToucheEntrer);
    });
}

// Attacher les événements initiaux
document.getElementById("boutonAjoutJoueur").addEventListener('click', ajoutJoueur);
document.getElementById("boutonReset").addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.totalScore').forEach(score => {
        score.textContent = "000";
    });
});

// Initialisation des boutons au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    reaffecterBoutons();
    document.querySelectorAll(".LogoAdd").forEach(button => {
        button.addEventListener('click', ajouterChiffre);
    });
    document.querySelectorAll(".LogoSub").forEach(button => {
        button.addEventListener('click', soustraireChiffre);
    });
    ajouterGestionToucheEntrer(); // Ajoute la gestion de la touche "Entrée"
});
