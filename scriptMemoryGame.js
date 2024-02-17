document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const words = ['House', 'בית', 'Cat', 'חתול', 'Tree', 'עץ'];
    const mixedWords = shuffle([...words, ...words]);

    mixedWords.forEach(word => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    let firstCard, secondCard;
    let hasFlippedCard = false;

    function flipCard() {
        if (this === firstCard) return;
        this.classList.add('flipped');
        this.textContent = this.dataset.word;

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const isFirstCardEnglish = isNaN(firstCard.dataset.word);
        const isSecondCardHebrew = isNaN(secondCard.dataset.word);

        if ((isFirstCardEnglish && !isSecondCardHebrew) || (!isFirstCardEnglish && isSecondCardHebrew)) {
            if (firstCard.dataset.word === secondCard.dataset.word) {
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    firstCard.textContent = '';
                    secondCard.textContent = '';
                }, 1000);
            }
            resetBoard();
        }
    }

    function resetBoard() {
        [hasFlippedCard, firstCard, secondCard] = [false, null, null];
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }
});
