let lag = 195;
let promise = Promise.resolve();

function addWinnerClass(el) {
  el.remove();
  let newWrapper = document.createElement('div');
  newWrapper.classList = 'winners newWrapper';

  document.getElementById("board").append(newWrapper);

  el.classList.add('winners');
  newWrapper.append(el);
}

function addLosingClass(el, str) {
  el.remove();
  document.getElementById("board").append(el);
  el.classList = (`${str === 'good' ? 'evil' : 'good'} man ui-draggable-handle ui-draggable-disabled losers`);
}

function gameWinnerIs(str) {
  
  document.querySelectorAll(".die").forEach(die => {
    die.remove();
  });
  
  const footerEl = document.querySelector("footer");
  footerEl.innerHTML = "";

  const playAgain = document.createElement('div');
  playAgain.setAttribute("title", "Play Again");
  playAgain.setAttribute("id", "play-again");
  playAgain.classList = "oi oi-play-circle";

  footerEl.appendChild(playAgain);

  playAgain.addEventListener('click', () => location.reload());

  const winners = document.querySelectorAll(`.man.${str}`);
  const losers = document.querySelectorAll(`.man.${str === 'good' ? 'evil' : 'good'}`);
  
  winners.forEach(winningMan => {
    promise = promise.then(()=> {
      addWinnerClass(winningMan);
      return new Promise((resolve) => {
        setTimeout(resolve, lag)
      });
    });
  });

  losers.forEach(losingMan => {
    promise = promise.then(()=> {
      addLosingClass(losingMan, str);
      return new Promise((resolve) => {
        setTimeout(resolve, lag)
      });
    });
  });
};