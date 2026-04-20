const sticky = document.querySelector(".sticky");

ScrollTrigger.create({
  trigger: sticky,
  start: "bottom bottom",
  endTrigger: ".container_sticky",
  end: "bottom bottom",
  pin: true,
  markers: true
});