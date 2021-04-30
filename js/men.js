let lastTouchedManNum;

function getManNum(piece) {
  // get clicked man's point number
  let manNum;
  if (piece.parent().attr("id").includes("bounced")) {
    turn ? manNum = 0 : manNum = 25;
  } else {
    manNum = parseInt(piece.parent().attr("id").match(/[0-9]+/)[0]);
  }
  return manNum
}

function getPointNum(point) {
  let pointNum;
  if (point.id.includes('evil')) {
    pointNum = 0;
  } else if (point.id.includes('good')) {
    pointNum = 25;
  } else {
    pointNum = parseInt(point.id.match(/[0-9]+/)[0]);
  }
  return pointNum;
}

function initDroppable() {
  $(".point").droppable({
    accept: ".man",
    tolerance: "intersect",
    addClasses: false,
    activate: function (e, ui) {
      // get numbers for each point
      const pointNum = getPointNum(this);
      // get clicked man's point number
      const manNum = getManNum(ui.draggable);
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
            console.log(this);
            this.classList.remove('ui-droppable-active');
            $(this).droppable("disable");
          }
        }
      }
    },
    drop: function (e, ui) {
      ui.draggable.attr("style", "position: relative");
      e.target.append(ui.draggable[0]);

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
      const movedSpaces = direction * (getPointNum(this) - lastTouchedManNum)
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
      if (e.target.parentElement.getAttribute("id").includes("home")) {
        $(this).draggable('disable');
      } else {
        // re-enable all droppable zones
        $('.point').droppable("enable");
      }
      amIBounced();
    },
    start: function (e, ui) {
      lastTouchedManNum = getManNum($(this));
    }
  });
}

function amIBounced() {
  let bouncedMen = $('#bounced').children()
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
  } else {
    $(".man").draggable('enable');
  }
}

initDraggable();
initDroppable();
$(".man.evil").draggable('disable');
$(".man.good").draggable('disable');