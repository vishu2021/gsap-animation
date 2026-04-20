gsap.set(".section", {transformOrigin: "center top"});

gsap.utils.toArray(".section").forEach((section) => {
  gsap.fromTo(section, {scale: 0.9}, {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "+=100%",
      scrub: true,
    }
  });
  ScrollTrigger.create({
    trigger: section,
    pin: true,
    start: "top top",
    pinSpacing: false,
    end: "+=100%"
  });
  
});