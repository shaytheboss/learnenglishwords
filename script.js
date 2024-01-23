let translations = {};
let lastPlayedWord = null;

// Function to load translations and then play a word
function loadTranslationsAndPlayWord() {
    fetch('translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            playWord();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Function to play a random word
function playWord() {
    const words = Object.keys(translations);
    if (words.length === 0) {
        console.error('No words found in the translations object');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
	lastPlayedWord = word; // set the last played word

    // Playing the audio
    var audio = new Audio(`sounds/${word}.mp3`);
    audio.play();

    // cleaning from the webpage the word and its translation
    document.getElementById('wordDisplay').textContent = ` `;
    document.getElementById('translationDisplay').textContent = ` `;
}

// Function to play again the last word
function playAgain() {
    if (lastPlayedWord) {
        var audio = new Audio(`sounds/${lastPlayedWord}.mp3`);
        audio.play();
    } else {
        console.error('No word has been played yet');
    }
}

// Function to show the hebrew translate
function displayWordInHebrew() {
	if (lastPlayedWord) {
         // Displaying the word and its translation
		document.getElementById('wordDisplay').textContent = `מילה באנגלית : ${lastPlayedWord}`;
		document.getElementById('translationDisplay').textContent = `תרגום: ${translations[lastPlayedWord]}`;
    } else {
        console.error('No word has been played yet');
    }
   
}


document.getElementById('playWord').addEventListener('click', loadTranslationsAndPlayWord);
document.getElementById('playAgain').addEventListener('click', playAgain);
document.getElementById('displayWordInHebrew').addEventListener('click', displayWordInHebrew);
