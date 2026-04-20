gsap.registerPlugin(ScrollTrigger);

console.clear();

// Select all contact icons
const contactIcons = gsap.utils.toArray(".contact-icon");

contactIcons.forEach((icon) => {
  gsap.set(icon, { xPercent: "-100", opacity: 0 });
  const t = gsap
    .to(icon, {
      scale: 1.2,
      transformOrigin: "center center",
      backgroundColor: "#fff"
    })
    .reverse();
  icon.addEventListener("mouseenter", () => t.reversed(!t.reversed()));
  icon.addEventListener("mouseleave", () => t.reversed(!t.reversed()));
});

const t = gsap.to(contactIcons, {
  x: 0,
  opacity: 1,
  duration: 0.5,
  stagger: 0.2
});

// Create a GSAP timeline for contact icons

ScrollTrigger.create({
  start: "top+=200",
  end: "+=1",
  markers: true,
  onEnter: () => {
    t.reversed(!t.reversed());
    mainTimeline.reversed(!mainTimeline.reversed());
  },
  onLeaveBack: () => {
    t.reversed(!t.reversed());
    mainTimeline.reversed(!mainTimeline.reversed());
  }
});

// Create a timeline for other elements
const mainTimeline = gsap.timeline({ paused: true });

// Add the animations for other elements to the main timeline
mainTimeline.to(".bottom-bar", { y: -100 });
// .to(".logo-icon", { opacity: 0 }, "<");

// Pause the main timeline initially
mainTimeline.reverse();