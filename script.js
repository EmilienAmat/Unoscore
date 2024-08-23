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
    document.getElementById("suppJoueur")?.addEventListener('click', (e) => {
        e.preventDefault();
        const elementParent = e.target.closest('.joueurs');
        if (elementParent) {
            elementParent.remove();
        }
    });
}

// Fonction pour modifier le nom d'un joueur
function modifierNom() {
    document.getElementById("RenommerJoueur")?.addEventListener('click', (e) => {
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

// Fonction pour ajouter un chiffre au score
function ajouterChiffre(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    let joueurConcerne = event.target.closest('.joueurs');
    let inputNombre = joueurConcerne.querySelector('.Input');
    let scoreFinal = joueurConcerne.querySelector('.totalScore');

    let nombreInscrit = parseInt(inputNombre.value, 10);
    if (isNaN(nombreInscrit)) {
        nombreInscrit = 0; // Défaut à 0 si l'entrée n'est pas un nombre valide
    }

    let score = parseInt(scoreFinal.textContent, 10);
    score += nombreInscrit;
    scoreFinal.textContent = score;
    inputNombre.value = '';
}

// Fonction pour soustraire un chiffre du score
function soustraireChiffre(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    let joueurConcerne = event.target.closest('.joueurs');
    let inputNombre = joueurConcerne.querySelector('.Input');
    let scoreFinal = joueurConcerne.querySelector('.totalScore');

    let nombreInscrit = parseInt(inputNombre.value, 10);
    if (isNaN(nombreInscrit)) {
        nombreInscrit = 0; // Défaut à 0 si l'entrée n'est pas un nombre valide
    }

    let score = parseInt(scoreFinal.textContent, 10);
    score -= nombreInscrit;
    if (score < 0) {
        score = 0; // Empêcher le score d'être négatif
    }
    scoreFinal.textContent = score;
    inputNombre.value = '';
}

// Fonction pour ajouter un joueur
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

    // Réaffecter les gestionnaires de boutons et d'événements pour les nouveaux éléments
    reaffecterBoutons();
    noeudHTML.querySelector(".LogoAdd").addEventListener('click', ajouterChiffre);
    noeudHTML.querySelector(".LogoSub").addEventListener('click', soustraireChiffre);

    // Ajouter un événement pour l'input de chaque nouveau joueur
    noeudHTML.querySelector('.Input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Empêche la soumission du formulaire
            ajouterChiffre(e);
        }
    });
}

// Attacher les événements initiaux
document.getElementById("boutonAjoutJoueur")?.addEventListener('click', ajoutJoueur);
document.getElementById("boutonReset")?.addEventListener('click', (e) => {
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

    // Ajouter l'événement pour les champs de saisie existants
    document.querySelectorAll('.Input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Empêche la soumission du formulaire
                ajouterChiffre(e);
            }
        });
    });
});
