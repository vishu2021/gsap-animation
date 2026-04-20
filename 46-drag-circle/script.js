//gsap.to()... infinity and beyond!

//To learn more about using GreenSock's bonus plugins for free on CodePen visit: https://gsap.com/trial

const width = 120,
  slides = gsap.utils.toArray(".slider > div"),
  snap = gsap.utils.snap(width);

let snappedPosition = 0;

gsap.set(slides, {
  backgroundColor: gsap.utils.wrap(["red", "green", "blue"])
});

let draggable = new Draggable(".slider", {
  type: "x",
  inertia: true,
  zIndexBoost: false,
  bounds: {
    minX: 0 - width * (slides.length - 1),
    maxX: 0
  },
  snap: {
    points: function (point) {
      return { x: Math.round(point.x / width) * width };
    }
  },
  onDrag: checkSnap,
  onThrowUpdate: checkSnap,
  // onDragEnd: function() {},
  onClick: function (e) {
    alert(
      "Active slide is number " +
        slides[Math.abs(Math.round(this.x / width))].innerText
    );
  }
});

function checkSnap() {
  let position = snap(draggable.x + width / 2); // add half the width to center it
  if (position !== snappedPosition) {
    console.log("changed", snappedPosition);
    snappedPosition = position;
  }
}