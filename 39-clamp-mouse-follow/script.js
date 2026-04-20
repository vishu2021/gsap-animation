console.clear();

const dimensions = document.querySelector(".box").getBoundingClientRect();
const ballDimensions =  document.querySelector(".ball").getBoundingClientRect();
const setX = gsap.quickSetter(".ball", "x", "px");
const clamperX = gsap.utils.clamp(
  (ballDimensions.width - dimensions.width) / 2,
  (dimensions.width - ballDimensions.width) / 2,
);
const setY = gsap.quickSetter(".ball", "y", "px");
const clamperY = gsap.utils.clamp(
  (ballDimensions.height - dimensions.height) / 2,
  (dimensions.height - ballDimensions.height) / 2,
);
const listener = document.querySelector(".listener");

listener.addEventListener("mousemove", (e) => {
  setX(clamperX(e.offsetX - dimensions.width / 2));
  setY(clamperY(e.offsetY - dimensions.height / 2));
});

listener.addEventListener("mouseleave", () => {
  gsap.to(".ball", { x: 0, y: 0, ease: "back.out", duration: 0.25 });
});