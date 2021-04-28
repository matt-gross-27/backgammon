const center = document.querySelectorAll(".mid");

function makeDie () {
  let die = document.createElement("div");
  die.classList.add("die");
  return die;
}

function appendDie(side) {
  const dieOne = makeDie()
  const dieTwo = makeDie()

  if (side = "l") {
    center[2].appendChild(dieOne);
    center[3].appendChild(dieTwo);
  }

  console.log(dieOne, side);
}

appendDie("l");
