let lag = 140;
let promise = Promise.resolve();

function addWinnerClass(el, str) {
  el.remove();
  let newEl = document.createElement('div');

  let newWrapper = document.createElement('div');
  newWrapper.classList = 'winners newWrapper';

  document.getElementById("board").append(newWrapper);

  el.classList.add('winners');
  newWrapper.append(el);

  el.classList.add('man');
  el.classList.add(`${str}`);
}

function gameWinnerIs(str) {
  
  const winners = document.querySelectorAll(`.man.${str}`);


  winners.forEach(winningMan => {
    promise = promise.then(()=> {
      addWinnerClass(winningMan, str);
      return new Promise((resolve) => {
        setTimeout(resolve, lag)
      });
    });    
  });
};