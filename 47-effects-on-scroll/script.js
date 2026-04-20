ScrollTrigger.create({
  trigger: ".bg-1",
  pin: ".bg-1",
  pinSpacing: false,
  start: "top top",
  // markers: true,
  endTrigger: ".imgs-wrapper",
  end: "bottom bottom",
});

gsap.set(".imgs-wrapper", {
  marginTop: -document.querySelector(".imgs-wrapper").offsetHeight
});

let tl = gsap
  .timeline({
    scrollTrigger: {
      pin: ".container",
      trigger: ".container",
      scrub: 1,
      start: "0% 0%",
    },
  })
  .to(".cube", { rotation: 300 })
  .to(".cube", { opacity: 0 })
  .fromTo(
    ".imgs-wrapper",
    { yPercent: 100, scaleY: 2.4 },
    { yPercent: 0, scaleY: 1 },
  );