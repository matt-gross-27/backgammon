let lastTouchedManNum;
let goodScore = 0;
let evilScore = 0;

function getManPosition(piece) {
  // get clicked man's point number
  let manPosition;
  if (piece.parent().attr("id").includes("bounced")) {
    turn ? manPosition = 0 : manPosition = 25;
  } else {
    manPosition = parseInt(piece.parent().attr("id").match(/[0-9]+/)[0]);
  }
  return manPosition
}

function getPointPosition(point) {
  let getPointPosition;
  if (point.id.includes('evil')) {
    getPointPosition = 0;
  } else if (point.id.includes('good')) {
    getPointPosition = 25;
  } else {
    getPointPosition = parseInt(point.id.match(/[0-9]+/)[0]);
  }
  return getPointPosition;
}

function initDroppable() {
  $(".point").droppable({
    accept: ".man",
    tolerance: "intersect",
    addClasses: false,
    activate: function (e, ui) {
      // get numbers for each point
      const pointNum = getPointPosition(this);
      // get clicked man's point number
      const manNum = getManPosition(ui.draggable);
      // good goes up evil goes down :)
      const direction = turn ? 1 : -1
      // check if point is NOT a dice roll away from man
      if (pointNum !== manNum + roll[0] * direction && pointNum !== manNum + roll[1] * direction) {
        this.classList.remove('ui-droppable-active');
        // if it isn't disable droppable
        $(this).droppable("disable");
      } else {
        // Check if point is occupied
        const isNotAlone = $(e.target).children().length > 1

        if (isNotAlone) {
          // Check if occupied by Good
          const isGoodOccupied = $(e.target).children()[0].classList[1] === "good";
          if ((isNotAlone && turn && !isGoodOccupied) || (isNotAlone && !turn && isGoodOccupied)) {
            this.classList.remove('ui-droppable-active');
            $(this).droppable("disable");
          }
        }
      }
    },
    drop: function (e, ui) {
      e.target.append(ui.draggable[0]);
      ui.draggable.attr("style", "position: relative");

      const landedOnGood = $(e.target).children()[0].classList[1] === "good";
      const isGood = turn;
      const isAlone = $(e.target).children().length === 2

      // bounce lone opponent
      if (isGood !== landedOnGood && isAlone) {
        const bounceMe = $(e.target).children()[0]
        bounceMe.remove()
        $("#bounced").append(bounceMe);
      }

      // remove move number from roll array
      const direction = turn ? 1 : -1
      const movedSpaces = direction * (getPointPosition(this) - lastTouchedManNum)
      for (let i = 0; i < roll.length; i++) {
        if (movedSpaces === roll[i]) {
          return roll.splice(i, 1);
        }
      }
    },
  });
}

function initDraggable() {

  $(".man").draggable({
    addClasses: false,
    scroll: false,
    containment: $("#points"),
    tolerance: "pointer",
    revert: true,
    // handle rotated parent element
    drag: function (e, ui) {
      if (rotated) {
        ui.position.top = -ui.position.top
        ui.position.left = -ui.position.left
      }
    },
    stop: function (e, ui) {
      checkTurn();
      amIBounced();

      // re-enable all droppable zones
      $('.point').droppable('enable');

      if (e.target.parentElement.getAttribute("id").includes("home")) {
        $(this).draggable('disable');

        auditScore();
        
        if (goodScore === 15) {
          gameWinnerIs('good');
        }

        if (evilScore === 15) {
          gameWinnerIs('evil');
        }
      }
    },
    start: function (e, ui) {
      lastTouchedManNum = getManPosition($(this));
      isHomeOpen(this);
    }
  });
}

function amIBounced() {
  let bouncedMen = $('#bounced').children()
  
  if (bouncedMen.length === 0) {
    return false;
  }

  let mustMoveFirst = [];

  for (let i = 0; i < bouncedMen.length; i++) {
    if (bouncedMen[i].getAttribute("id").includes('evil') && !turn) {
      mustMoveFirst.push(bouncedMen[i]);
    }

    if (bouncedMen[i].getAttribute("id").includes('good') && turn) {
      mustMoveFirst.push(bouncedMen[i]);
    }
  }

  if (mustMoveFirst.length) {
    $(".man").draggable('disable');
    mustMoveFirst.forEach(man => $(man).draggable('enable'));
  }
}


initDraggable();
initDroppable();

$(".man.evil").draggable('disable');
$(".man.good").draggable('disable');

$("#home-evil-0").droppable('disable');
$("#home-good-25").droppable('disable');


function isHomeOpen(self) {
  const turnString = turn ? 'good' : 'evil';
  let max = 0;
  let min = 25;

  if (turn) {
    document.querySelectorAll(`.man.${turnString}`).forEach(man => {
      let poss = getManPosition($(man));
      if (poss < min) {
        min = poss;
      };
    });

    const dist = 25 - min
    if (dist > 6) {
      $("#home-good-25").droppable('disable');
    } else {
      $("#home-good-25").droppable('enable');
      roll[0] > dist ? roll[0] = dist : roll[0] = roll[0]
      roll[1] > dist ? roll[1] = dist : roll[1] = roll[1]
    }

  }

  else if (!turn) {
    document.querySelectorAll(`.man.${turnString}`).forEach(man => {
      let poss = getManPosition($(man));
      if (poss > max) {
        max = poss;
      };
    });
    if (max > 6) {
      $("#home-evil-0").droppable('disable')
    } else {
      $("#home-evil-0").droppable('enable');
      roll[0] > max ? roll[0] = max : roll[0] = roll[0]
      roll[1] > max ? roll[1] = max : roll[1] = roll[1]
    }
  }
};