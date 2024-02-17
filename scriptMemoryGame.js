
document.addEventListener('DOMContentLoaded', () => {
    fetch('memoryWords.json')
    .then(response => response.json())
    .then(data => {
        const gameBoard = document.getElementById('game-board');
        // Convert object to an array of [key, value] pairs, then flatten it
        const words = Object.entries(data).flat();
        const mixedWords = shuffle([...words, ...words]);

        mixedWords.forEach(word => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.word = word;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading words:', error));

    // Remainder of the script...


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
		let isMatch = firstCard.dataset.word === secondCard.dataset.word;

		if (isMatch) {
			// If cards match, display a success message and hide them
			displaySuccessMessage(); // Display success message
			
			setTimeout(() => {
				firstCard.style.visibility = 'hidden';
				secondCard.style.visibility = 'hidden';
				resetBoard();
			}, 500);
		} else {
			// If cards don't match, flip them back
			unflipCards();
		}
	}


	function displaySuccessMessage() {
		const message = document.getElementById('success-message');
		message.textContent = "Great Match!";
		setTimeout(() => {
			message.textContent = "";
		}, 1500); // Clear message after a delay
	}

	function unflipCards() {
		setTimeout(() => {
			firstCard.classList.remove('flipped');
			secondCard.classList.remove('flipped');
			firstCard.textContent = ''; // Remove text when flipped back
			secondCard.textContent = ''; // Remove text when flipped back
			resetBoard();
		}, 1500);
	}



    function resetBoard() {
        [hasFlippedCard, firstCard, secondCard] = [false, null, null];
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }
});
