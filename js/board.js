$board = document.getElementById("board");

let gI = 0;
let focalPoint;
let offset;

for (let i = 0; i < 195; i++) {
  const square = document.createElement('div');
  square.classList.add("square");
  $board.appendChild(square);
  // OUT OF PLAY
  if ((i + 15) % 15 === 0
    || (i + 8) % 15 === 0
    || (i + 1) % 15 === 0
    || i < 16
    || i > 179
  ) {
    square.classList.add("edge");
  }
  else {
    square.classList.add(gI);
    // COLORS
    if (gI >= 72) {
      if (gI % 2 === 0) {
        square.classList.add("even");
      } else {
        square.classList.add("odd");
      }
    } else {
      if (gI % 2 === 0) {
        square.classList.add("odd");
      } else {
        square.classList.add("even");
      }
    }

    if (gI > 59 && gI < 72) {
      square.classList.remove("even");
      square.classList.remove("odd");
      square.classList.add("mid");
    }

    // TRIANGLES
    if (gI === 0) {
      focalPoint = 500;
      offset = 0;
    }

    if (gI % 12 === 0 && gI < 72 && gI) {
      focalPoint -= 100;
      offset += 10;
    }
    
    if (gI === 72) {
      focalPoint = 0;
      offset = 40;
    }

    if (gI % 12 === 0 && gI > 72) {
      focalPoint -= 100;
      offset -= 10;
    }

    if (gI >= 72) {
      square.setAttribute("style", `clip-path: polygon(50% ${focalPoint}%, ${0 + offset}% 100%, ${100 - offset}% 100%);`)
    } else if (gI <= 59) {
      square.setAttribute("style", `clip-path: polygon(50% ${focalPoint}%, ${0 + offset}% 0, ${100 - offset}% 0);`)
    }
    gI++;
  }
}