console.clear();

const panels = gsap.utils.toArray(".panel");
gsap.to(panels, {
  xPercent: (i) => -100 * i,
  x: (i) => i && 50 * (i - 1),
  duration: (i) => i,
  ease: "none",
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: "+=" + 100 * panels.length + "5",
    scrub: true,
    pin: true,
    markers: {
      startColor: "white",
      endColor: "white"
    }
  }
});