const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'summer',
    'scroopy',
    'rick',
    'pickle-rick',
    'pessoa-passaro',
    'morty',
    'meeseeks',
    'jessica',
    'jerry',
    'beth',
]

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

function checkEndGame() {
    const disableCards = document.querySelectorAll('.desabled-card');

    if (disableCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}


function checkCards() {
    const firstCaracter = firstCard.getAttribute('data-character');
    const secondCaracter = secondCard.getAttribute('data-character');

    if (firstCaracter === secondCaracter) {
        firstCard.firstChild.classList.add('desabled-card');
        secondCard.firstChild.classList.add('desabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

function revealCard({ target }) {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

function createCard(character) {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../image/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicaCharacters = [...characters, ...characters];

    const shuffledArray = duplicaCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    });
}


const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML; //o + converte para numero//
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

