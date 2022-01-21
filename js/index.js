const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

function setCardsTurned(cards, turned) {
  cards.forEach(cardName => {
    document.querySelectorAll(`[data-card-name="${cardName}"]`).forEach(card => {
      card.classList.toggle("turned", turned);
    })
  })
}

function updateScore() {
  const pairsClickedEl = document.getElementById("pairs-clicked");
  const pairsGuessedEl = document.getElementById("pairs-guessed");
  pairsClickedEl.innerHTML = memoryGame.pairsClicked;
  pairsGuessedEl.innerHTML = memoryGame.pairsGuessed;
  return;
}

function markGameAsFinished() {
  alert("You won!")
}

function resetGame() {
  document.querySelectorAll('.card').forEach((card) => {
    card.classList.toggle("turned", false);
  })
  memoryGame.reset();
  updateScore();
}

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  document.getElementById("reset").addEventListener("click", resetGame);

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      const { cardName } = card.dataset;
      switch (memoryGame.pickedCards.length) {
        case 0:
          memoryGame.pickedCards.push(cardName);
          card.classList.toggle("turned");
          break;
        
        case 1:
          memoryGame.pickedCards.push(cardName);
          card.classList.toggle("turned");
          if (memoryGame.checkIfPair(memoryGame.pickedCards[0], memoryGame.pickedCards[1])) {
            setCardsTurned(memoryGame.pickedCards, true);
            memoryGame.pickedCards = [];
          } else {
            setTimeout(() => {
              setCardsTurned(memoryGame.pickedCards, false);
              memoryGame.pickedCards = [];
            }, 1000);
          }
          
          break;

        default:
          return;
      }
      
      updateScore();
      if (memoryGame.checkIfFinished()) {
        setTimeout(() => markGameAsFinished(), 1000);
      }
    });
  });
});
