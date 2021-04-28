$( ".point" ).droppable({
  accept: ".man",
  tolerance: "intersect",
  addClasses: false,
  drop: (e, ui) => {
    ui.draggable.attr("style", "position: relative");
    e.target.append(ui.draggable[0]);
  },
  out: (e, ui) => {
    console.log(e, ui)
  }
});


$( ".man" ).draggable({
  addClasses: false,
  scroll: false,
  containment: $("#board"),
  tolerance: "pointer",
  revert: true,
});

$( ".man.evil" ).draggable('disable');
$( ".man.good" ).draggable('disable');