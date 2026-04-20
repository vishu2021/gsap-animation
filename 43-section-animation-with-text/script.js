console.clear();

gsap.to(".head", {
  x: "-=1000",
  scrollTrigger: {
    trigger: ".head",
    start: "bottom bottom",
    scrub: true
  }
});

gsap.to(".project-container", {
  scrollTrigger: {
    trigger: ".project-container",
    pin: true,
    markers: true,
    start: "bottom bottom",
    end: "bottom center",
    pinType: "transform",
    pinSpacing: false
  }
});