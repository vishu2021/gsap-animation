console.clear();

const layers = gsap.utils.toArray(".layer");
const amount = layers.length;

gsap.set(layers, { zIndex: (i) => amount - i });

gsap.to(layers.reverse(), {
  clipPath: "circle(71% at 50% 50%)",
  duration: 1,
  ease: "power1.inOut",
  stagger: 1,
  repeat: -1,
  repeatDelay: 1,
  yoyo: true
});