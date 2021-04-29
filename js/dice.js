const center = document.querySelectorAll(".mid");
let turn = true;
let roll = [];

function randomized(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
};

function endTurn(e) {
  roll = [];
  document.querySelectorAll(".die").forEach(die => {
    die.remove();
  });
  $( ".man.good" ).draggable('disable');
  $( ".man.evil" ).draggable('disable');
  appendDie(!turn);
}

function rollDice(e) {
  document.querySelectorAll(".die").forEach(die => {
    die.setAttribute("style", "display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);")

    const rolling = setInterval(() => {
      let num = Math.floor(Math.random() * 6 + 1);

      roll.unshift(num);
      if (roll.length > 2) {
        roll.pop();
      };
      
      let result
      if (num === 1) {
        result = `
        <div class="box-5">⚫️</div>
        `;
      } else if (num === 2) {
        result = `
        <div class="box-1">⚫️</div>
        <div class="box-9">⚫️</div>
        `;
      } else if (num === 3) {
        result = `
        <div class="box-1">⚫️</div>
        <div class="box-5">⚫️</div>
        <div class="box-9">⚫️</div>
        `;
      } else if (num === 4) {
        result = `
        <div class="box-1">⚫️</div>
        <div class="box-3">⚫️</div>
        <div class="box-7">⚫️</div>
        <div class="box-9">⚫️</div>
        `;
      } else if (num === 5) {
        result = `
        <div class="box-1">⚫️</div>
        <div class="box-3">⚫️</div>
        <div class="box-5">⚫️</div>
        <div class="box-7">⚫️</div>
        <div class="box-9">⚫️</div>
        `;
      } else if (num === 6) {
        result = `
        <div class="box-1">⚫️</div>
        <div class="box-2">⚫️</div>
        <div class="box-3">⚫️</div>
        <div class="box-7">⚫️</div>
        <div class="box-8">⚫️</div>
        <div class="box-9">⚫️</div>
        `;
      }
      die.innerHTML = result;

      setTimeout(()=> {
        clearInterval(rolling);
        if (turn === true) {
          $( ".man.good" ).draggable('enable');
        } else {
          $( ".man.evil" ).draggable('enable');
        }
      },1000);

    }, 25);

    die.removeEventListener('click', rollDice);
    die.addEventListener('click', endTurn);
  });
}

function makeDie() {
  let die = document.createElement("div");
  die.classList.add("die");
  die.innerHTML = `<span class="oi oi-loop-circular"></span>`
  die.addEventListener("click", rollDice)
  return die;
}

function appendDie(side) {
  const dieOne = makeDie()
  const dieTwo = makeDie()

  if (side === true) {
    turn = true;
    center[8].appendChild(dieOne);
    center[9].appendChild(dieTwo);

    dieOne.classList = ("good die")
    dieTwo.classList = ("good die")
  }

  if (side === false) {
    turn = false
    center[2].appendChild(dieOne);
    center[3].appendChild(dieTwo);

    dieOne.classList = ("evil die")
    dieTwo.classList = ("evil die")
  }
}

// Start Game
appendDie(randomized([true, false]));