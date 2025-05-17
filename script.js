'use strict';

//Starting condition
// Selecting elements

const player0El = document.querySelector('.player--0');

const player1El = document.querySelector('.player--1');

const score0DOMEl = document.querySelector(`#score--0`);

const currentScore0DOMEl = document.querySelector(`#current--0`);

const currentScore1DOMEl = document.querySelector(`#current--1`);

const score1DOMEl = document.querySelector(`#score--1`);

const diceDOMEl = document.querySelector(`.dice`);

const newGameButton = document.querySelector(`.btn--new`);

const rollButton = document.querySelector(`.btn--roll`);

const holdButton = document.querySelector(`.btn--hold`);

const activePlayerBackground = document.querySelector(`.player--active`);

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // MUST RESET THE CURRENT SCORE BACK TO 0! Thats what I forgot!

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //what toggle does is, if the class is not present, it will add it. If it is, it will remove it.
};

score0DOMEl.textContent = 0;
score1DOMEl.textContent = 0;
diceDOMEl.classList.add(`hidden`);

let currentScore = 0;

let activePlayer = 0;

const scores = [0, 0];

// Rolling the dice.

rollButton.addEventListener(`click`, function () {
  let dice = Math.trunc(Math.random() * 6) + 1;

  console.log(dice);

  diceDOMEl.classList.remove(`hidden`);

  diceDOMEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else if (dice == 1) {
    switchPlayer();
  }
});

holdButton.addEventListener(`click`, function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);

    diceDOMEl.classList.add(`hidden`);
    holdButton.classList.add(`hidden`);
    rollButton.classList.add(`hidden`);
  } else {
    switchPlayer();
  }
});

newGameButton.addEventListener(`click`, function () {
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  score0DOMEl.textContent = 0;
  score1DOMEl.textContent = 0;
  currentScore0DOMEl.textContent = 0;
  currentScore1DOMEl.textContent = 0;

  diceDOMEl.classList.add(`hidden`);
  holdButton.classList.remove(`hidden`);
  rollButton.classList.remove(`hidden`);

  document.querySelector('.player--winner')?.classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add(`player--active`);
});
