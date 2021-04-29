$(".point").droppable({
  accept: ".man",
  tolerance: "intersect",
  addClasses: false,
  drop: (e, ui) => {
    ui.draggable.attr("style", "position: relative");
    e.target.append(ui.draggable[0]);

    const landedOnGood = $(e.target).children()[0].classList[1] === "good";
    const isGood = turn;
    const isAlone = $(e.target).children().length === 2
    console.log('childrenCount', $(e.target).children().length)

    if (isGood !== landedOnGood && isAlone) {
      const bounceMe =  $(e.target).children()[0]
      bounceMe.remove()
      $("#bounced").append(bounceMe);
    }

    console.log('turn (true = good)', turn)
  },
});


$(".man").draggable({
  addClasses: false,
  scroll: false,
  containment: $("#board"),
  tolerance: "pointer",
  revert: true,
});

$(".man.evil").draggable('disable');
$(".man.good").draggable('disable');