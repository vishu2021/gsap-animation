gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function () {
  let introPin = false;

  let headerHeight = 0;
  const getScrollDistance = () => {
    return jQuery(".milestones-wrap").height();
  };
  // let scrollDistance = jQuery(".milestones-wrap").height();
  let markerDistance = jQuery(".marker").height();

  ScrollTrigger.create({
    trigger: ".timeline-container",
    start: "top top",
    end: () => "+=" + getScrollDistance(),
    markers: true
  });
});