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

// Fonction pour valider les entrées numériques
function validerEntree() {
    document.querySelectorAll('.Input').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, ''); // Enlève tout ce qui n'est pas un chiffre
        });
    });
}

// Fonction pour ajouter un nombre
function ajouterChiffre(event) {
    event.preventDefault(); // Empêche la soumission du formulaire
    let joueurConcerne = event.target.closest('.joueurs');
    if (joueurConcerne) {
        let inputNombre = joueurConcerne.querySelector('.Input');
        let scoreFinal = joueurConcerne.querySelector('.totalScore');

        let score = parseInt(scoreFinal.textContent);
        let nombreInscrit = parseInt(inputNombre.value);

        if (!isNaN(nombreInscrit)) {
            score += nombreInscrit;
            scoreFinal.textContent = score;
        }

        inputNombre.value = '';
    }
}

// Fonction pour soustraire un nombre
function soustraireChiffre(event) {
    event.preventDefault(); // Empêche la soumission du formulaire
    let joueurConcerne = event.target.closest('.joueurs');
    if (joueurConcerne) {
        let inputNombre = joueurConcerne.querySelector('.Input');
        let scoreFinal = joueurConcerne.querySelector('.totalScore');

        let score = parseInt(scoreFinal.textContent);
        let nombreInscrit = parseInt(inputNombre.value);

        if (!isNaN(nombreInscrit) && score >= nombreInscrit) {
            score -= nombreInscrit;
            scoreFinal.textContent = score;
        } else if (!isNaN(nombreInscrit) && score < nombreInscrit) {
            scoreFinal.textContent = 0; // Empêche le score de devenir négatif
        }

        inputNombre.value = '';
    }
}

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
    document.querySelectorAll("#suppJoueur").forEach(bouton => {
        bouton.addEventListener('click', (e) => {
            e.preventDefault();
            const elementParent = e.target.closest('.joueurs');
            if (elementParent) {
                elementParent.remove();
            }
        });
    });
}

// Fonction pour modifier le nom d'un joueur
function modifierNom() {
    document.querySelectorAll("#RenommerJoueur").forEach(bouton => {
        bouton.addEventListener('click', (e) => {
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

                    // Réaffecter les boutons après renommage
                    reaffecterBoutons();
                }
            }
        });
    });
}

// Fonction pour réaffecter les gestionnaires de boutons
function reaffecterBoutons() {
    document.querySelectorAll(".settingLogo").forEach(bouton => {
        bouton.removeEventListener('click', gererOptions); // Retirer l'ancien gestionnaire
        bouton.addEventListener('click', gererOptions); // Ajouter le nouveau gestionnaire
    });

    document.querySelectorAll(".LogoAdd").forEach(button => {
        button.removeEventListener('click', ajouterChiffre); // Retirer l'ancien gestionnaire
        button.addEventListener('click', ajouterChiffre); // Ajouter le nouveau gestionnaire
    });

    document.querySelectorAll(".LogoSub").forEach(button => {
        button.removeEventListener('click', soustraireChiffre); // Retirer l'ancien gestionnaire
        button.addEventListener('click', soustraireChiffre); // Ajouter le nouveau gestionnaire
    });
}

// Fonction pour ajouter un nouveau joueur
function ajoutJoueur(e) {
    e.preventDefault();
    let joueurs = document.querySelectorAll(".joueurs");
    let nouveauJoueur = joueurs.length + 1;
    let elementParent = document.getElementById("bodyScore");

    const joueurHTML = `
        <a href="#"><img src="settingLogo.png" class="settingLogo" alt=""></a>
        <p class="NomsJoueurs">Nom Joueur ${nouveauJoueur}</p>
        <form action="">
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

    // Réaffecter les fonctions après ajout d'un joueur
    reaffecterBoutons();
    validerEntree();
}

document.getElementById("boutonAjoutJoueur").addEventListener('click', ajoutJoueur);

// Fonction pour empêcher le rechargement des formulaires
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        if (form.querySelector('.Input')) {
            event.preventDefault(); // Empêche le rechargement de la page
        }
    });
});

// Fonction de réinitialisation
document.getElementById("boutonReset").addEventListener('click', (e) => {
    e.preventDefault();

    // Réinitialiser les noms des joueurs
    document.querySelectorAll('.NomsJoueurs').forEach((nom, index) => {
        nom.textContent = 'Nom Joueur ' + (index + 1);
    });

    // Réinitialiser les scores des joueurs
    document.querySelectorAll('.totalScore').forEach((score) => {
        score.textContent = '000';
    });

    // Réinitialiser les champs d'entrée
    document.querySelectorAll('.Input').forEach((input) => {
        input.value = '';
    });

    // Supprimer tous les joueurs ajoutés dynamiquement (au-delà du joueur 1 et 2)
    document.querySelectorAll('.joueurs').forEach((joueur, index) => {
        if (index > 1) { // On garde les deux premiers joueurs (index 0 et 1)
            joueur.remove();
        }
    });

    // Réinitialiser les boutons "setting" pour chaque joueur
    document.querySelectorAll('.joueurs').forEach((joueur) => {
        const settingList = joueur.querySelector('.settingList');
        if (settingList) {
            settingList.remove(); // Supprimer les options de réglage visibles
        }

        const settingLogo = joueur.querySelector('.settingLogo');
        if (!settingLogo) {
            // Si le bouton "setting" n'existe pas, on le réajoute
            joueur.insertAdjacentHTML('afterbegin', optionLogo);
        }
    });

    // Réactiver les fonctions de "supprimer" et "modifier" après la réinitialisation
    reaffecterBoutons();
});

// Initialisation des boutons au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    reaffecterBoutons();
    validerEntree();
});
