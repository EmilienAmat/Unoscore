document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('playerName');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const playersList = document.getElementById('playersList');

    addPlayerBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName !== '') {
            addPlayer(playerName);
            playerNameInput.value = '';
        }
    });

    function addPlayer(name) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');

        const playerNameSpan = document.createElement('span');
        playerNameSpan.textContent = name;

        const totalScoreSpan = document.createElement('span');
        totalScoreSpan.textContent = '0';
        totalScoreSpan.classList.add('total-score');

        const scoreInput = document.createElement('input');
        scoreInput.type = 'number';
        scoreInput.value = 0;
        scoreInput.classList.add('scoreInput');

        const addBtn = document.createElement('button');
        addBtn.innerHTML = '<img src="./add.png" alt="Ajouter">';
        addBtn.addEventListener('click', () => {
            const score = parseInt(scoreInput.value, 10);
            if (!isNaN(score)) {
                totalScoreSpan.textContent = parseInt(totalScoreSpan.textContent, 10) + score;
            }
        });

        const subtractBtn = document.createElement('button');
        subtractBtn.innerHTML = '<img src="./subtract.png" alt="Soustraire">';
        subtractBtn.addEventListener('click', () => {
            const score = parseInt(scoreInput.value, 10);
            if (!isNaN(score)) {
                totalScoreSpan.textContent = parseInt(totalScoreSpan.textContent, 10) - score;
            }
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Supprimer';
        removeBtn.addEventListener('click', () => {
            playerDiv.remove();
        });

        playerDiv.appendChild(playerNameSpan);
        playerDiv.appendChild(totalScoreSpan);
        playerDiv.appendChild(scoreInput);
        playerDiv.appendChild(addBtn);
        playerDiv.appendChild(subtractBtn);
        playerDiv.appendChild(removeBtn);

        playersList.appendChild(playerDiv);
    }
});
