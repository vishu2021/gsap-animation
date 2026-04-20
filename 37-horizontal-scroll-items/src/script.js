console.clear();

jQuery(document).ready(function ($) {
  gsap.registerPlugin(ScrollTrigger);

  var timelineObj = ".timeline-items";
  var timelineItems = gsap.utils.toArray(".timeline-item-container");

  var tl = gsap.to(timelineItems, {
    xPercent: -50 * (timelineItems.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: timelineObj,
      start: "top top",
      end: () =>
        "+=" + document.querySelector(".timeline-item-container").offsetWidth,
      pin: true,
      scrub: true,
      snap: {
        snapTo: [0, 1],
        duration: 2,
        inertia: false,
        ease: "none"
      },
      markers: true
    }
  });

  var lines = gsap.utils.toArray(
    ".timeline-item-container .timeline-line .line-inner"
  );

  lines.forEach(function (line) {
    gsap.to(line, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: line,
        start: "left 50%",
        end: () =>
          "+=" + document.querySelector(".timeline-item-container").offsetWidth,
        containerAnimation: tl,
        scrub: true,
        markers: true
      }
    });
  });
});
