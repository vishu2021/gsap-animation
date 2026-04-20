gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 1,
  effects: false,
  smoothTouch: 0.1,
  content: "#smooth-content",
  wrapper: "#smooth-wrapper"
});

const triggerButton = document.getElementById("triggerButton");

triggerButton.addEventListener("click", () => {
  if (smoother) {
    smoother.effects(".parallax-image", { speed: "clamp(0.8)" });
    ScrollTrigger.refresh();
  } else {
    console.error("Smoother is not defined.");
  }
});