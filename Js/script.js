// Récupérer les éléments du DOM
const scoreDisplay = document.querySelector(".score");
const messageDisplay = document.querySelector(".message");
const resetButton = document.querySelector("#reset-button");
const gameBoard = document.getElementById("game-board");

// Définir les variables globales
let cards = [];
let score = 0;
let firstCard = null;
let secondCard = null;
let flippedCards = 0;

// Définir les noms d'images
const imageNames = ["Assets/Aviron-100.jpeg", "Assets/carte_leoindiegames.jpeg", "Assets/carte_leolearning.jpeg" ,"Assets/Krypto.jpeg", "Assets/DevinciJunior.jpeg", "Assets/LDV_Esport.jpeg", "Assets/LeoCook.jpeg", "Assets/LeoFive.jpeg", "Assets/LeoKing'sWalker.jpeg", "Assets/LeoRacingTeam.jpeg", "Assets/Vegas.jpeg" ,"Assets/LeoTactical.jpeg" ,"Assets/Eagles-100.jpg"];
// Créer les paires d'images
const imagePairs = [];

for (let i = 0; i < imageNames.length; i++) {
    const image = imageNames[i];
    imagePairs.push(image, image);
}

// Mélanger les images
imagePairs.sort(() => 0.5 - Math.random());

// Créer les cartes et les ajouter au plateau de jeu
for (let i = 0; i < imagePairs.length; i++) {
    const card = createCard(imagePairs[i]);
    gameBoard.appendChild(card);
}

// Fonction pour créer une carte
function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => flipCard(card, image));
    const img = document.createElement("img");
    img.src = `${image}`;
    card.appendChild(img);
    return card;
}

// Fonction pour retourner une carte
function flipCard(card, image) {
    // Empêcher l'utilisateur de retourner plus de deux cartes à la fois
    if (flippedCards >= 2) {
        return;
    }

    // Retourner la carte
    card.classList.add("flipped");
    flippedCards++;

    // Enregistrer la première ou la deuxième carte retournée
    if (firstCard === null) {
        firstCard = { card, image };
    } else if (secondCard === null) {
        secondCard = { card, image };
    }

    // Vérifier si les deux cartes retournées sont une paire
    if (secondCard !== null) {
        if (firstCard.image === secondCard.image) {
            // Les deux cartes sont une paire
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            messageDisplay.textContent = "Bravo, vous avez trouvé une paire !";
            firstCard = null;
            secondCard = null;
            flippedCards = 0;
        } else {
            // Les deux cartes ne sont pas une paire
            setTimeout(() => {
                firstCard.card.classList.remove("flipped");
                secondCard.card.classList.remove("flipped");
                firstCard = null;
                secondCard = null;
                flippedCards = 0;
                messageDisplay.textContent = "";
            }, 1000);
        }
    }

    // Vérifier si toutes les cartes ont été retournées
    if (score === imagePairs.length / 2) {
        messageDisplay.textContent = "Félicitations, vous avez gagné !";
    }
}

// Fonction pour réinitialiser le jeu
function resetGame () {
    // Réinitialiser les variables
    cards = [];
    score = 0;
    firstCard = null;
    secondCard = null;
    flippedCards = 0;

    // Réinitialiser l'affichage
    scoreDisplay.textContent = `Score: ${score}`;
    messageDisplay.textContent = "";
    gameBoard.innerHTML = "";

    // Mélanger les images
    imagePairs.sort(() => 0.5 - Math.random());

    // Créer les cartes et les ajouter au plateau de jeu
    for (let i = 0; i < imagePairs.length; i++) {
        const card = createCard(imagePairs[i]);
        gameBoard.appendChild(card);
    }
}

const cartes = document.querySelectorAll(".card");

cartes.forEach((card) => {
  const cover = document.createElement("div");
  cover.classList.add("cover");
  card.appendChild(cover);
});

cartes.forEach((card) => {
  card.addEventListener("click", () => {
    card.querySelector(".cover").classList.toggle("return")
  });
});