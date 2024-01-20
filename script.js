let translations = {};

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

    // Playing the audio
    var audio = new Audio(`sounds/${word}.mp3`);
    audio.play();

    // Displaying the word and its translation
    document.getElementById('wordDisplay').textContent = `מילה באנגלית: ${word}`;
    document.getElementById('translationDisplay').textContent = `תרגום: ${translations[word]}`;
}

// Function to play again the word
function playAgain() {
    const words = Object.keys(translations);
    if (words.length === 0) {
        console.error('No words found in the translations object');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    // Playing the audio
    var audio = new Audio(`sounds/${word}.mp3`);
    audio.play();

    // Displaying the word and its translation
    document.getElementById('wordDisplay').textContent = `מילה באנגלית: ${word}`;
    document.getElementById('translationDisplay').textContent = `תרגום: ${translations[word]}`;
}


// Function to show the hebrew translate
function displayWordInHebrew() {
    const words = Object.keys(translations);
    if (words.length === 0) {
        console.error('No words found in the translations object');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    // Playing the audio
    var audio = new Audio(`sounds/${word}.mp3`);
    audio.play();

    // Displaying the word and its translation
    document.getElementById('wordDisplay').textContent = `מילה באנגלית: ${word}`;
    document.getElementById('translationDisplay').textContent = `תרגום: ${translations[word]}`;
}


document.getElementById('playWord').addEventListener('click', loadTranslationsAndPlayWord);
