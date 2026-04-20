document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".square");
  const targetWidth = target.offsetWidth;
  const targetParentWidth = document.querySelector("div:has(>.square)").offsetWidth;
  const amountToScroll = targetParentWidth - targetWidth;
  gsap.to(target, {
    x: amountToScroll,
    y: 0,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".section:has(.square)",
      start: "top top+=60px",
      end: "bottom top+=60px",
      scrub: true,
      pin: ".container",
      markers: true,
    },
  });
});