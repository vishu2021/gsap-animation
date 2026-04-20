console.clear();

const animation = lottie.loadAnimation({
  container: document.querySelector(".lottie-container"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets.codepen.io/35984/tapered_hello.json"
});
animation.setSpeed(3);

let paused = true;
const box = document.querySelector(".box");
const t = gsap
  .to(box, {
    x: 200,
    rotation: 360,
    paused: true
  })
  .reverse();

const toggleAnimations = () => {};

box.addEventListener("click", () => {
  animation.setDirection(paused ? 1 : -1);
  t.reversed(!t.reversed());
  animation.play();
  paused = !paused;
});
