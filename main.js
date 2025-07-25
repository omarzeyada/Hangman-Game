// Letters
const letters = "abcdefghijklmnopqrstuvwxyz-";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node 
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span)

});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python"
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up"
  ],
  people: [
    "Abu Obaida",
    "Yahya Al-Sanwar",
    "Muhammad Al-Deif",
    "Ahmed Al-Yassin",
    "Abu Hamza",
    "Muhammad Al-Sanwar",
    "Yahya Ayyash"
  ],
  countries: [
    "Syria",
    "Palestine", 
    "Yemen", 
    "Egypt", 
    "Saudi Arabia", 
    "Qater"
  ]
};

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Kays Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Span
  if (letter === ' ') {

    // Add Class To The Span
    emptySpan.className = "with-space";

  }

  // Appen Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);

});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {

    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {

      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {

        // Set Status To Correct
        theStatus = true;

        // Loop On All Word Spans
        guessSpans.forEach((span, spanIndex) => {

          if (wordIndex === spanIndex) {

            span.innerHTML = theClickedLetter;

          }

        });

      }

    });

    // OutLine Loop

    // If Letter Is Wrong
    if (theStatus !== true) {

      // Increase The Wrong Attempts
      wrongAttempts++

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {

        endGame();

        lettersContainer.classList.add("finished");

        let button = document.createElement("div");
        let textButton = document.createTextNode("Try Agian");

        button.appendChild(textButton);
        button.className = "button";

        document.body.appendChild(button);

        button.onclick = function () {

          window.location.reload();

        };

      }

    } 

    let allGuessed = true;
    guessSpans.forEach(span => {

        if (!span.classList.contains("with-space") && span.innerHTML === '') {

          allGuessed = false;

        }

    });

    if (allGuessed) {

      checkWin();

      lettersContainer.classList.add("finished");

      let button = document.createElement("div");
      let textButton = document.createTextNode("Play Agian");

      button.appendChild(textButton);
      button.className = "button";

      document.body.appendChild(button);

      button.onclick = function () {

        window.location.reload();

      };

    }

  }

});

// End Game Function
function endGame() {

  // Create Popup Div
  let div =  document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is: \{${randomValueValue}\}`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);

}

function checkWin() {

  // Create Popup Div
  let div =  document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Congoratz, The number of errors is: \{${wrongAttempts}\}`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);

}
