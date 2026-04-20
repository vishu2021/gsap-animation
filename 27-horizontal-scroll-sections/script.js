console.clear();

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".panel");
const stops = [];
sections.forEach((section, index) => {
  if (section.dataset.pin) stops.push(index);
});
console.log(stops);

const tl = gsap.timeline({
  defaults: {
    ease: "none"
  },
  repeat: -1,
  yoyo: true,
  repeatDelay: 1,
  /*scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 0.5,
    end: "+=4000"
  }*/
});
stops.forEach((stop, index) => {
  const q = gsap.utils.selector(sections[stop]);
  tl.to(sections, {
    xPercent: -(100 * stop),
    duration: stop
  })
    .to(q(".fade-out-text"), {
      opacity: 0,
      y: 25,
      ease: "power2.out",
      duration: 1
    })
    .from(
      q(".title-fade-in"),
      {
        opacity: 0,
        y: -25,
        ease: "power2.out",
        duration: 1
      },
      "<"
    );
  if (index === stops.length - 1) {
    tl.to(sections, {
      xPercent: -(100 * (sections.length - 1)),
      duration: sections.length - stop
    });
  }
});