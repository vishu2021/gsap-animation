gsap.set(".section", { transformOrigin: "center top" });
const sections = gsap.utils.toArray(".section");
sections.forEach((section, idx) => {

  gsap.fromTo(section,
    { scale: idx >= sections.length - 1 ? 1 : 0.9 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "+=100%",
        scrub: true
      }
    }
  );
  gsap.to(section, {
    filter: idx >= sections.length - 1 ? "none" : "blur(2rem)",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=100%",
      scrub: true
    }
  });

  ScrollTrigger.create({
    trigger: section,
    pin: idx >= sections.length - 2 ? false : true,
    start: "top top",
    pinSpacing: idx >= sections.length - 2 ? true : false,
    end: "+=100%"
  });
});